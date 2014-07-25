export function formatRelativeAddress( sourceAddress, relativeAddress, sourceBits, relativeBits ) {

    var sign = relativeAddress < 0 ? '-' : '+';

    if ( typeof relativeAddress !== 'string' || ! isNaN( relativeAddress ) )
        relativeAddress = formatAddress( Math.abs( relativeAddress ), relativeBits, false );

    return formatAddress( sourceAddress, sourceBits ) + sign + relativeAddress;

};

export function formatDecimal( value, size ) {

    if ( isNaN( value ) )
        return 'NaN';

    var str = str.toString( );

    if ( typeof size === 'undefined' )
        return str;

    for ( var t = str.length; t < size; ++ t )
        str = '0' + str;

    return str;

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

export function formatAddress( address, bits, withPrefix = true ) {

    if ( isNaN( address ) )
        return 'NaN';

    var str = address.toString( 16 ).toLowerCase( );

    if ( typeof bits !== 'undefined' )
        while ( str.length < Math.ceil( bits / 4 ) )
            str = '0' + str;

    if ( withPrefix )
        str = '$' + str;

    return str;

};

export function formatHexadecimal( value, bits, withPrefix = true ) {

    if ( isNaN( value ) )
        return 'NaN';

    var str = value.toString( 16 ).toLowerCase( );

    if ( typeof bits !== 'undefined' )
        while ( str.length < Math.ceil( bits / 4 ) )
            str = '0' + str;

    if ( withPrefix )
        str = '0x' + str;

    return str;

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
