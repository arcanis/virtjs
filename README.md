# This branch is out-dated. I keep it mainly for reference, and you should probably not use it.

![Virt.js](http://arcanis.github.io/virt.js/documents/assets/logo.png)

![](http://arcanis.github.io/virt.js/documents/assets/github-banner.png)

> Virt.js is a library designed to easily emulate various architectures using a common Javascript API. These emulators can be plugged to multiple input and output devices.

**Fair warning :** This library is still in a very early development phase. APIs may be subject to changes. Take a look in the [example](https://github.com/arcanis/Virt.js/tree/master/examples) directory to check how to use the current revision, and feel free to ask if you have any doubt.

**Quick example :** The [Pokelib](https://github.com/arcanis/pokelib) is a library allowing to access a running Pokemon game using a simple Javascript API. Check out this [angular.js demo](http://arcanis.github.io/pokelib/example/), where angular data are directly providen by the Pokelib!

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

## Usage

```html
<script src="Virtjs-latest.min.js"></script>
<script src="Virtjs.GameBoy-latest.min.js"></script>

<script>

    var startEmulator = function ( rom ) {

        var engine = Virtjs.create( Virtjs.engine.GameBoy, {

            devices : {
                screen : new Virtjs.screen.WebGL( ),
                input : new Virtjs.input.Keyboard( { map : map } ),
                timer : new Virtjs.timer.RAFrame( ),
                data : new Virtjs.data.LocalStorage( )
            },

            skipBios : true

        } ).load( rom );

        document.body.appendChild( engine.devices.screen.canvas );

    };

    ( function ( ) {

        var xhr = new XMLHttpRequest( );

        xhr.open( 'GET', 'http://example.org', true );

        xhr.responseType = 'arraybuffer';

        xhr.addEventListener( 'load', function ( ) {
            startEmulator( xhr.response );
        } );

        xhr.send( null );

    } )( );

</script>
```

## Maintainer

Virt.js is maintained by Maël Nison ([@arcanis](https://twitter.com/arcanis) on Twitter).
