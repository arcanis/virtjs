define( [

    '../components/mbc/MBC1',
    '../components/mbc/MBC3',
    '../components/mbc/MBC5',
    '../components/mbc/NoMBC'

], function ( MBC1, MBC3, MBC5, NoMBC ) {

    return {

        0 : NoMBC,

        1 : MBC1,
        2 : MBC1,
        3 : MBC1,

        15 : MBC3,
        16 : MBC3,
        17 : MBC3,
        18 : MBC3,
        19 : MBC3,

        25 : MBC5,
        26 : MBC5,
        27 : MBC5,
        28 : MBC5,
        29 : MBC5,
        30 : MBC5

    };

} );
