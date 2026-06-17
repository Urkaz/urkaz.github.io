# Overview

Orion Engine is a C++20 game engine built from scratch, using [The Cherno's Hazel series](https://www.youtube.com/playlist?list=PLlrATfBNZ98dC-V-N3m0Go4deliWHPFwT) as a starting point to understand how a real engine is structured.

The current implementation covers the 2D layer, built on top of **OpenGL** (via **GLFW** and **GLAD**), with **GLM** for math, **spdlog** for logging, and **Dear ImGui** for debug overlays. The build system is CMake, with support for CPM, Conan, and vcpkg as package managers.


# Architecture

The engine is organized into four main layers:

* **Core**: Application loop, layer stack, event system, input abstraction, timestep, and logging.
* **Renderer**: Graphics API abstraction, 2D quad renderer, shader library, texture management, orthographic camera, and a deferred render command queue.
* **Platform**: Platform-specific implementations behind abstract interfaces. Currently supports Windows and OpenGL 4.x.

Client applications are a subclass of `Application` and attach `Layer` objects to hook into the update and event loops, keeping engine and application logic fully separated.

# Features

## Renderer

* 2D quad rendering with flat color and texture support.
* Deferred `RenderCommandQueue` storing commands as type-erased lambdas.
* Vertex and index buffers with a flexible element layout descriptor (`Float`, `Int`, `Mat4`, etc.).
* Shader compilation from source or file, with a `ShaderLibrary` for named lookup.
* Orthographic camera with view-projection matrix caching, zoom, and input-driven translation and rotation.

## Event system

Events are dispatched synchronously through the layer stack, with each layer able to consume an event and stop propagation. Events are grouped into categories (Application, Input, Keyboard, Mouse) and dispatched with a type-safe `EventDispatcher`.

## Core

* `Scope<T>` and `Ref<T>` aliases for `unique_ptr` and `shared_ptr` throughout the codebase.
* Platform-abstracted `Window` and `Input` interfaces, currently implemented for Windows.
* Logging via spdlog with separate engine and client loggers and file output.
* Debug-only assertions and compile-time platform detection macros.

# Tooling

The CMake setup includes optional integration for several code quality tools:

* **Clang-Tidy** for static analysis.
* **Clang-Format** and **cmake-format** for consistent formatting.
* **Sanitizers**: AddressSanitizer, UndefinedBehaviorSanitizer, LeakSanitizer, and ThreadSanitizer.
* **LTO** (Link Time Optimization) enabled by default.
* **Code coverage** reporting support.
* **Doxygen** for documentation generation.
