# Build Path and Packaging Improvements

## Problem

The default archive output structure in UnrealBuildTool left two practical gaps in the build workflow.

Build output folders had no consistent naming tied to the project's version numbers. Identifying which archived build corresponded to which internal or master version required checking external records, which made it easy to mix up builds or lose track of what had been delivered.

Debug symbols (PDB files and their platform equivalents) were generated separately from the packaged build. Investigating a crash meant locating and matching the correct symbols manually, which added friction, especially when working with older builds where the original symbol output directory was no longer obvious.

## Changes

### Build path folder structure

A virtual `GetPlatformFolderStructure` method was added to the `Platform` base class in AutomationTool. Each console platform overrides it to return a folder name built from the project's master version and internal build number.

This return value is injected into both `GetStagingDirectory` and `GetArchiveDirectory` in `DeploymentContext`, which compose the full output path as:

```
<ProjectName>/<Platform>/<GetPlatformFolderStructure>/<Date>_<Configuration>
```

The result is that each build is stored in a folder that encodes its version at a glance, without needing to open any files or consult external records.

### Build digest

A virtual `ProcessArchivedProject` method already existed on the `Platform` base class as an empty stub meant for platform-specific post-processing after the archive is applied. The console platform implementations override this method to generate a digest of the final build output, which can be used to verify integrity and confirm that two copies of the same version are identical.

### Debug symbol export

The platform-specific automation scripts were modified to export debug symbols into the same output folder as the packaged build, so all files needed to reproduce and investigate a crash are in one place.

## Assessment

### Pros

- Build folders are self-documenting: version numbers are encoded directly in the path, removing the need for external bookkeeping when managing multiple builds.
- The hash provides a lightweight integrity check, useful when sharing builds between teams or uploading to a distribution system.
- Keeping debug symbols alongside the build simplifies crash investigation and removes the need to track down symbol files from a separate location.

### Cons / Risks

- Builds take up more disk space per version since debug symbols are now included in the build output folder rather than a separate staging directory.
