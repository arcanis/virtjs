![Virt.js](http://arcanis.github.io/virt.js/documents/assets/logo.png)

![](http://arcanis.github.io/virt.js/documents/assets/github-banner.png)

**Warning :** This library is still in a very early development phase. API are subject to many changes, and nothing is guaranteed. Take a look in the [example](https://github.com/arcanis/Virtjs/tree/master/examples) directory to check how to use the current revision.

> Virtjs is an ES6 library designed to easily emulate various architectures using a common Javascript API. These emulators can be plugged to multiple input and output devices.

## Why another emulation library ?

Actually, there isn't any JS emulation library (yet). There is a lot of proof-of-concept emulators, originally developed as applications, and a few of them have been repackaged to be npm-compatible, but as far as I know, none of them has a strong focus on its public API.

Virtjs wants to fill this space by providing a consistent and convenient API to the developers. This way, new kind of applications can be made, using emulators for various purposes, such as writing AIs, sharing homebrews, trying new gameplay concepts on old games, ...

A stretch goal is to achieve acceptable performances on mobile (at least Android).

## Supported architectures

  - Game Boy + Game Boy Color (many thanks to the [#gbdev @EFnet](irc://irc.efnet.pl/#gbdev) irc network)
      * Performances are fine, but not enough. I'd like to match [GameBoy-Online](https://github.com/grantgalitz/GameBoy-Online/) on this one
      * Some cartridge types are not supported yet
      * Sound is missing, I could need help here
      * I still have to find a way to automate testing

  - More to come after completing the listed goals

## Usage

Please check the [website](http://virtjs.com) to find an extensive documentation about how to use this library.

### Node.js

  - Install the `virtjs` npm package
  - The package exports a function that can be used to fetch Virtjs' modules

```js
var GameboyEngine = require( 'virtjs' )( 'arch/gb/gameboy' );
var engine = new GameboyEngine( ... );
```

### Browser, as standalone file

  - Download the [current release file](https://github.com/arcanis/virt.js/tree/master/build/output/virtjs.web.js) and include it into your app
  - Use the `virtjs` function to fetch Virtjs' modules

```js
var GameboyEngine = virtjs( 'arch/gb/gameboy' );
var engine = new GameboyEngine( ... );
```

### Browser, with SystemJS

  - Clone the repository somewhere
  - Configure the `System.paths` property to target the virtjs source directory

```
System.paths[ 'virtjs' ] = './libraries/virtjs/';

Promise.all( [

    System.import( 'virtjs/arch/gb/Engine' ),

    System.import( 'virtjs/devices/inputs/KeyboardInput' ),
    System.import( 'virtjs/devices/screens/WebGLScreen' ),
    System.import( 'virtjs/devices/timers/AnimationFrameTimer' ),
    System.import( 'virtjs/tools' )

] ).then( function ( results ) {

        var input = new results[ 1 ].KeyboardInput( );
        var screen = new results[ 2 ].WebGLScreen( );
        var timer = new results[ 3 ].AnimationFrameTimer( );

        var engine = new results[ 0 ].Engine( { devices : {
            input : input,
            screen : screen,
            timer : timer
        } } );

        results[ 4 ].fetch( 'http://example.org/rom.gb' ).then( function ( rom ) {
            engine.loadArrayBuffer( rom );
        } );

    } );

</script>
```

Note that, if you're in an ES6 module, you can also use the usual `import` statements:

```js
import { Engine }              from 'virtjs/arch/gb/Engine';

import { KeyboardInput }       from 'virtjs/devices/inputs/KeyboardInput';
import { WebGLScreen }         from 'virtjs/devices/screens/WebGLScreen';
import { AnimationFrameTimer } from 'virtjs/devices/timers/AnimationFrameTimer';
import { fetch }               from 'virtjs/tools';

var input = new KeyboardInput( ... );
var screen = new WebGLScreen( ... );
var timer = new AnimationFrameTimer( );

var engine = new Engine( { devices : {
    input, screen, timer
} } );

fetch( 'http://example.org/rom.gb' ).then( rom => {
    engine.loadArrayBuffer( rom );
} );
```

## Maintainer

Virtjs is maintained by Maël Nison ([@arcanis](https://twitter.com/arcanis) on Twitter).
