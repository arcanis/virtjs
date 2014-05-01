/*global Virtjs, angular*/

angular.module( 'emulatorTypes', [ ] )

    .service( 'emulatorTypes', function ( ) {

        var GB = Virtjs.engine.GameBoy;

        this.gameboy = this.gb = {

            engine : GB,

            keyboardMap : {
                65 : GB.A,    90 : GB.B,  13 : GB.START, 32 : GB.SELECT
              , 37 : GB.LEFT, 38 : GB.UP, 39 : GB.RIGHT, 40 : GB.DOWN
            }

        };

    } )

;
