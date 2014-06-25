import { MBC1 }  from '../cartridges/MBC1';
import { MBC3 }  from '../cartridges/MBC3';
import { MBC5 }  from '../cartridges/MBC5';
import { NoMBC } from '../cartridges/NoMBC';

export var mbcTypes = {

     0 : NoMBC,

     1 : MBC1.bind( null, { } ),
     2 : MBC1.bind( null, { ram : true } ),
     3 : MBC1.bind( null, { ram : true, battery : true } ),

    15 : MBC3.bind( null, { } ),
    16 : MBC3.bind( null, { timer : true } ),
    17 : MBC3.bind( null, { timer : true, battery : true } ),
    18 : MBC3.bind( null, { ram : true } ),
    19 : MBC3.bind( null, { ram : true, battery : true } ),

    25 : MBC5.bind( null, { } ),
    26 : MBC5.bind( null, { ram : true } ),
    27 : MBC5.bind( null, { ram : true, battery : true } ),
    28 : MBC5.bind( null, { rumble : true } ),
    29 : MBC5.bind( null, { rumble : true, ram : true } ),
    30 : MBC5.bind( null, { rumble : true, ram : true, battery : true } )

};
