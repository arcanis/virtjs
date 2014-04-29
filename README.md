![Virt.js](http://arcanis.github.io/virt.js/documents/assets/logo.png)

**Warning :** This library is still in a very early development phase. API are subject to many changes, and nothing is guaranteed. Take a look in the [example](https://github.com/arcanis/Virt.js/tree/master/examples) directory to check how to use the current revision.

> Virt.js is a library designed to easily emulate various architectures using a common Javascript API. These emulators can be plugged to multiple input and output devices.

## Why another emulation library ?

Actually, there isn't any JS emulation library (yet). There is a lot of proof-of-concept emulators, originally developed as applications, and a few of them have been repackaged to be npm-compatible, but as far as I know, none of them has a strong focus on its public API.

Virt.js wants to fill this space by providing a consistent API to the developer. This way, any application can start manage an emulator to do various tasks, such as writing AIs, sharing demo ROM, trying new gameplay concepts, revisiting old games, ...

A stretch goal is to achieve acceptable performances on mobile (at least Android).

## Requirements

- [Typed Arrays](http://caniuse.com/#feat=typedarrays)

## Current architectures

- Game Boy

## Maintainer

Virt.js is maintained by Maël Nison ([@arcanis](https://twitter.com/arcanis)).
