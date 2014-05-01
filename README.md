![Virt.js](http://arcanis.github.io/virt.js/documents/assets/logo.png)

![](http://arcanis.github.io/virt.js/documents/assets/github-banner.png)

**Warning :** This library is still in a very early development phase. API are subject to many changes, and nothing is guaranteed. Take a look in the [example](https://github.com/arcanis/Virt.js/tree/master/examples) directory to check how to use the current revision.

> Virt.js is a library designed to easily emulate various architectures using a common Javascript API. These emulators can be plugged to multiple input and output devices.

## Why another emulation library ?

Actually, there isn't any JS emulation library (yet). There is a lot of proof-of-concept emulators, originally developed as applications, and a few of them have been repackaged to be npm-compatible, but as far as I know, none of them has a strong focus on its public API.

Virt.js wants to fill this space by providing a consistent and convenient API to the developers. This way, new kind of applications can be made, using emulators for various purposes, such as writing AIs, sharing homebrews, trying new gameplay concepts on old games, ...

A stretch goal is to achieve acceptable performances on mobile (at least Android).

## Supported architectures

- Game Boy (many thanks to the [#gbdev @EFnet](irc://irc.efnet.pl/#gbdev) irc network)
    * Performances are fine, but not enough. I would like to achieve the same than on [GameBoy-Online](https://github.com/grantgalitz/GameBoy-Online/)
    * Some cartridge types are not supported yet
    * Sound is missing, I could need help here
    * Have to find a way to automate testing

- More to come after completing the listed goals

## Build

    > sudo npm install -g requirejs
    > make

Generated libraries will be located into the [builds](https://github.com/arcanis/virt.js/tree/master/builds) directory.

## Maintainer

Virt.js is maintained by Maël Nison ([@arcanis](https://twitter.com/arcanis) on Twitter).
