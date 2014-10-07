![Virt.js](http://arcanis.github.io/virt.js/documents/assets/logo.png)

![](http://arcanis.github.io/virt.js/documents/assets/github-banner.png)

**Warning :** This library is still in a very early development phase. API are subject to many changes, and nothing is guaranteed. Take a look in the [example](https://github.com/arcanis/Virtjs/tree/master/examples) directory to check how to use the current revision.

**Note :** Since the library is wrote entirely in ES6, it uses a module system. For the time being I would like to see if it would be possible to avoid compiling it into a single big file, so I suggest you use [JSPM](http://jspm.io/) to load it - even if it's totally possible to configure Webpack to bundle it into an application, which might suits your use case better.

> Virtjs is an ES6 library designed to easily emulate various architectures using a common Javascript API. These emulators can be plugged to multiple input and output devices.

## Why another emulation library ?

Actually, there isn't any JS emulation library (yet). There is a lot of proof-of-concept emulators, originally developed as applications, and a few of them have been repackaged to be npm-compatible, but as far as I know, none of them has a strong focus on its public API.

Virtjs wants to fill this space by providing a consistent and convenient API to the developers. This way, new kind of applications can be made, using emulators for various purposes, such as writing AIs, sharing homebrews, trying new gameplay concepts on old games, ...

A stretch goal is to achieve acceptable performances on mobile (at least Android).

## Supported architectures

- Game Boy (many thanks to the [#gbdev @EFnet](irc://irc.efnet.pl/#gbdev) irc network)
    * Performances are fine, but not enough. I would like to achieve the same than on [GameBoy-Online](https://github.com/grantgalitz/GameBoy-Online/)
    * Some cartridge types are not supported yet
    * Sound is missing, I could need help here
    * Have to find a way to automate testing

- More to come after completing the listed goals

## Usage

```
$> git clone git@github.com:arcanis/virt.js virtjs
$> ( cd virtjs && git checkout next )
```

```html
<script src="https://jspm.io/system@0.6.js"></script>

<script>

    // Due to some pesky CORS reasons, this path cannot be on a domain which hasn't
    // set its Access-Control-Allow-Origin to allow direct connection.
    var virtjsPath = './libraries/virtjs/';

    System.paths[ 'virtjs' ] = virtjsPath + '/libraries/virtjs/';
    System.paths[ 'virtjs-gb' ] = virtjsPath + '/libraries/virtjs-gb/';

    Promise.all( [

        System.import( 'virtjs/devices/inputs/KeyboardInput' ),
        System.import( 'virtjs/devices/screens/WebGLScreen' ),
        System.import( 'virtjs/devices/timers/AnimationFrameTimer' ),

        System.import( 'virtjs-gb/Engine' )

    ] ).then( function ( results ) {

        var input = new results[ 0 ].KeyboardInput( );
        var screen = new results[ 1 ].WebGLScreen( );
        var timer = new results[ 2 ].AnimationFrame( );

        var engine = new results[ 3 ].Engine( { devices : {
            input : input,
            screen : screen,
            timer : timer
        } } );

        fetch( 'http://example.org/rom.gb' ).then( function ( rom ) {
            engine.loadArrayBuffer( rom );
        } );

    } );

</script>
```

## Maintainer

Virtjs is maintained by Maël Nison ([@arcanis](https://twitter.com/arcanis) on Twitter).
