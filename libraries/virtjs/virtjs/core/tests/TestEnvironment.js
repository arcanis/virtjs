import { formatAddress, formatHexadecimal } from 'virtjs/utils/FormatUtils';

export class TestEnvironment {

    constructor( options = { } ) {

        this.test = {

            expectations : options.expectations,

            address : null,
            opcode : null,
            expectation : null,

            opcodes : { }

        };

    }

    testBegin( address, opcode ) {

        this.test.expectation = this.test.expectations.readNext( );

        if ( this.test.expectation === undefined )
            return false;

        if ( this.test.expectation === false )
            return true;

        if ( this.test.expectation.address !== address )
            throw new Error( 'Wrong address (' + formatAddress( address, 16 ) + ' instead of ' + formatAddress( this.test.expectation.address, 16 ) + ')' );

        if ( this.test.expectation.opcode !== opcode )
            throw new Error( 'Wrong opcode at ' + formatAddress( address, 16 ) + ', expected ' + formatHexadecimal( this.test.expectation.opcode, 8 ) + ' rather than ' + formatHexadecimal( opcode, 8 ) );

        this.test.address = address;
        this.test.opcode = opcode;

        if ( ! this.test.opcodes[ opcode ] )
            this.test.opcodes[ opcode ] = [ ];

        for ( var [ name, before ] of this.test.expectation.registers )
            this[ name ] = before;

        return true;

    }

    testCommit( ) {

        if ( ! this.test.expectation )
            return ;

        var diffs = null;

        for ( var [ name, before, after ] of this.test.expectation.registers ) {
            if ( this[ name ] !== after ) {

                // Save the difference so we can print it later
                diffs = diffs || [ ];
                diffs.push( [ name, before, after, this[ name ] ] );

                // Reset the register to the value it should have
                this[ name ] = after;

            }
        }

        // Save the diff inside the array
        if ( diffs && this.test.opcodes[ this.test.opcode ].length < 3 ) {
            this.test.opcodes[ this.test.opcode ].push( [ this.test.address, diffs ] );
        }

    }

}
