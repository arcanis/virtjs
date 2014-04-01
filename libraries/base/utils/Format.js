define( [

], function ( ) {

    return {

        decimal : function ( value, length ) {

            if ( isNaN( value ) )
                return 'NaN';

            var str = value.toString( 10 );

            if ( typeof length !== 'undefined' )
                while ( str.length < length )
                    str = '0' + str;

            return str;

        },

        relativeAddress : function ( sourceAddress, relativeAddress, sourceBits, relativeBits ) {

            var sign = relativeAddress > 0 ? '+' : '-';

            return this.address( sourceAddress, sourceBits ) + sign + this.address( Math.abs( relativeAddress ), relativeBits );

        },

        address : function ( address, bits ) {

            if ( isNaN( address ) )
                return 'NaN';

            var str = address.toString( 16 ).toLowerCase( );

            if ( typeof bits !== 'undefined' )
                while ( str.length < Math.ceil( bits / 4 ) )
                    str = '0' + str;

            return '$' + str;

        },

        hexadecimal : function ( value, bits ) {

            if ( isNaN( value ) )
                return 'NaN';

            var str = value.toString( 16 ).toLowerCase( );

            if ( typeof bits !== 'undefined' )
                while ( str.length < Math.ceil( bits / 4 ) )
                    str = '0' + str;

            return '0x' + str;

        },

        binary : function ( value, bits ) {

            if ( isNaN( value ) )
                return 'NaN';

            var str = value.toString( 2 );

            if ( typeof bits !== 'undefined' )
                while ( str.length < bits )
                    str = '0' + str;

            return '0b' + str;

        }

    };

} );
