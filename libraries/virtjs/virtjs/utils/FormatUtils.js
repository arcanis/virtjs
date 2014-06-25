export function formatRelativeAddress( sourceAddress, relativeAddress, sourceBits, relativeBits ) {

    var sign = relativeAddress < 0 ? '-' : '+';

    if ( typeof relativeAddress !== 'string' || ! isNaN( relativeAddress ) )
        relativeAddress = this.address( Math.abs( relativeAddress ), relativeBits );

    return this.address( sourceAddress, sourceBits ) + sign + relativeAddress;

};

export function formatDecimal( value, size ) {

    if ( isNaN( value ) )
        return 'NaN';

    value = value.toString( );

    if ( typeof size === 'undefined' )
        return value;

    for ( var t = value.length; t < size; ++ t )
        value = '0' + value;

    return value;

};

export function formatString( str, size, leftAligned ) {

    str = str.toString( );

    if ( typeof size === 'undefined' )
        return str;

    if ( typeof leftAligned === 'undefined' )
        leftAligned = true;

    for ( var t = str.length; t < size; ++ t ) {
        if ( leftAligned ) {
            str += ' ';
        } else {
            str = ' ' + str;
        }
    }

    return str;

};

export function formatAddress( address, bits ) {

    if ( isNaN( address ) )
        return 'NaN';

    var str = address.toString( 16 ).toLowerCase( );

    if ( typeof bits !== 'undefined' )
        while ( str.length < Math.ceil( bits / 4 ) )
            str = '0' + str;

    return '$' + str;

};

export function formatHexadecimal( value, bits ) {

    if ( isNaN( value ) )
        return 'NaN';

    var str = value.toString( 16 ).toLowerCase( );

    if ( typeof bits !== 'undefined' )
        while ( str.length < Math.ceil( bits / 4 ) )
            str = '0' + str;

    return '0x' + str;

};

export function formatBinary( value, bits ) {

    if ( isNaN( value ) )
        return 'NaN';

    var str = value.toString( 2 );

    if ( typeof bits !== 'undefined' )
        while ( str.length < bits )
            str = '0' + str;

    return '0b' + str;

};
