/*global define*/

define( [

    './MBC1',
    './NoMBC'

], function ( MBC1, NoMBC ) {

    return {

        0 : NoMBC,

        1 : MBC1,
        2 : MBC1,
        3 : MBC1

    };

} );
