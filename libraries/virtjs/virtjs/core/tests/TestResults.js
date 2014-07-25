import { formatAddress, formatHexadecimal } from '../../utils/FormatUtils';

var GREEN  = '\u001B[32m';
var RED    = '\u001B[31m';
var YELLOW = '\u001B[33m';
var NORMAL = '\u001B[m';

export class TestResults {

    constructor( testEnvironment, additiveMask = 0x00 ) {

        this._environment = testEnvironment;

        this._additiveMask = additiveMask;

    }

    toString( ) {

        var output = '    ';

        for ( var x = 0; x < 16; ++ x )
            output += ' ' + formatHexadecimal( x, 8 );

        for ( var y = 0; y < 16; ++ y ) {

            output += '\n' + formatHexadecimal( y << 4, 8 );

            for ( var x = 0; x < 16; ++ x ) {

                var result = this._environment.test.opcodes[ ( y * 16 + x ) | this._additiveMask ];
                var color = result ? result.length ? RED : GREEN : YELLOW;

                output += ' ' + color + '\u2588\u2588\u2588\u2588' + NORMAL;

            }

        }

        output += '\n';

        for ( var y = 0; y < 16; ++ y ) {
            for ( var x = 0; x < 16; ++ x ) {

                var fails = this._environment.test.opcodes[ ( y * 16 + x ) | this._additiveMask ];

                if ( ! fails || fails.length === 0 )
                    continue ;

                fails.forEach( ( [ address, fail ] ) => {

                    output += '\nOpcode ' + formatHexadecimal( y * 16 + x, 8 ) + ' @ ' + formatAddress( address, 16 ) + ': ';

                    output += fail.map( ( [ register, before, expected, value ] ) => {

                        var format = [ 'pc', 'sp' ].indexOf( register ) !== -1
                            ? n => formatHexadecimal( n, 16 )
                            : n => formatHexadecimal( n, 8 );

                        return `${register} (${format(before)} -> ${format(expected)}) = ${format(value)}`;

                    } ).join( ', ' );

                } );

                output += '\n';

            }
        }

        return output;

    }

}
