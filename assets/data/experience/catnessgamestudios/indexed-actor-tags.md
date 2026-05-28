# Indexed Actor Tags

<notice>

**Unreal Engine Version**: 4.27

</notice>

<warning>
This optimization was made to optimize a Blueprint-only game. It doesn't work with Actor Tags managed from C++.
</warning>

## Problem

Unreal Engine's built-in `GetAllActorsWithTag` iterates over every actor in the world and checks each one's tag list individually. In worlds with thousands of actors this becomes a significant CPU bottleneck, especially when the call is made frequently, for example, in gameplay logic that runs every frame or on events triggered many times per second.

The complexity of the original query is **O(N × M)**, where N is the total number of actors in the world and M is the average number of tags per actor.

## Solution

The optimization introduces a persistent reverse index in `UWorld`: a `TMap<FName, FNestedActorArray>` named `ActorsWithTags` that maps each tag to the list of actors carrying it. With this structure in place, `GetAllActorsWithTag` no longer needs to iterate the world as it performs a single map lookup and returns the pre-built list directly.

```
Before: O(N × M) -> iterate all actors, check each tag list
After:  O(1)     -> map lookup + direct array access
```

## Implementation

The actor tag index lives in `UWorld` as a new member variable:

```cpp
UPROPERTY(Transient)
TMap<FName, FNestedActorArray> ActorsWithTags;
```

`FNestedActorArray` is a minimal `USTRUCT` wrapping a `TArray<AActor*>`. The wrapper exists because Unreal's reflection system does not support a raw `TArray` as a `TMap` value type inside a `UPROPERTY`.

```cpp
USTRUCT()
struct FNestedActorArray
{
	GENERATED_BODY()
	UPROPERTY(Transient)
	TArray<AActor*> Actors;
};
```

All writes to the index go through two new functions added to `UWorld`:

```cpp
void UWorld::AddActorTag(AActor* Actor, const FName& Tag);
void UWorld::RemoveActorTag(AActor* Actor, const FName& Tag);
```

**Keeping the index in sync** requires hooking into every place where an actor's tags can change. Three integration points were identified:

- **`AActor::BeginPlay`**: when an actor enters the world, all its existing tags are registered in the index. This covers tags set in the editor or assigned before play begins.
- **`AActor` destruction**: when an actor is destroyed, all its entries are removed from the index so the map never holds stale pointers.
- **`KismetArrayLibrary`**: the most involved part. Unreal's Blueprint VM routes all array node operations (`Add`, `AddUnique`, `Append`, `Insert`, `Remove`, `RemoveItem`, `Clear`, `Resize`) through this library. By intercepting these calls and checking whether the target array is the `Tags` property of an `AActor`, the index can be updated whenever a Blueprint graph modifies an actor's tags at runtime.

```c++
static void AddTagCheck(UObject* Object, FArrayProperty* ArrayProperty, void* ArrayAddr, void* PropertyPtr)
{
    //Stack.Object is the Object which Array is being modified
    if (Object && ArrayProperty->GetName().Equals(TEXT("Tags")))
    {
        AActor* ActorObjRef = Cast<AActor>(Object);
        if (ActorObjRef)
        {
            //Compare the pointer of the array being modified with the pointer of the Tags array from the Actor
            if (ArrayAddr == &ActorObjRef->Tags)
            {
                const FName* TagPtr = static_cast<FName*>(PropertyPtr);
                if (TagPtr && !TagPtr->IsNone())
                {
                    UWorld* World = Object->GetWorld();
                    World->AddActorTag(ActorObjRef, *TagPtr);
                }
            }
        }
    }
}
```

## Known Limitations

The index is only maintained for tag modifications made through **Blueprints**. Tags added or removed directly from C++ code after `BeginPlay`, via `Actor->Tags.Add(...)` or similar, bypass the `KismetArrayLibrary` interception entirely, so the index never learns about the change.

The consequence is that `GetAllActorsWithTag` will return an incomplete list for that tag, with no error, warning, or crash to signal the problem. The bug would only surface as actors silently missing from query results, which can be hard to trace back to a root cause.

## Assessment

The approach is solid for a project with a Blueprint-heavy workflow. The trade-offs are:

### Pros

- The performance gain is substantial and measurable. `GetAllActorsWithTag` goes from a full world scan to a near-instant lookup regardless of actor count.

### Cons / Risks

- Tags added directly from C++ code after `BeginPlay` do not update the index, which can cause query results to be silently incomplete. This is not a problem in a Blueprint-only codebase, but becomes a risk the moment any C++ code touches the `Tags` array at runtime without going through `World->AddActorTag`.
- The interception in `KismetArrayLibrary` ties index maintenance to property naming conventions (`Tags` on `AActor`), which makes it slightly fragile if the property were ever renamed or accessed through a non-standard path.

Overall, for a console porting context where `GetAllActorsWithTag` is called frequently and the codebase is 100% Blueprint, the optimization delivers a clear and measurable CPU win with known, manageable limitations.

## Code

<notice>

The full code will be available in the future.

</notice>