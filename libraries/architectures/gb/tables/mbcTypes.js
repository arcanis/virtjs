define( [

    'virtjs',

    '../cartridges/MBC1',
    '../cartridges/MBC3',
    '../cartridges/MBC5',
    '../cartridges/NoMBC'

], function ( Virtjs, MBC1, MBC3, MBC5, NoMBC ) {

    return {

         0 : NoMBC,

         1 : MBC1.bindConstructor( { } ),
         2 : MBC1.bindConstructor( { ram : true } ),
         3 : MBC1.bindConstructor( { ram : true, battery : true } ),

        15 : MBC3.bindConstructor( { } ),
        16 : MBC3.bindConstructor( { timer : true } ),
        17 : MBC3.bindConstructor( { timer : true, battery : true } ),
        18 : MBC3.bindConstructor( { ram : true } ),
        19 : MBC3.bindConstructor( { ram : true, battery : true } ),

        25 : MBC5.bindConstructor( { } ),
        26 : MBC5.bindConstructor( { ram : true } ),
        27 : MBC5.bindConstructor( { ram : true, battery : true } ),
        28 : MBC5.bindConstructor( { rumble : true } ),
        29 : MBC5.bindConstructor( { rumble : true, ram : true } ),
        30 : MBC5.bindConstructor( { rumble : true, ram : true, battery : true } )

    };

} );
