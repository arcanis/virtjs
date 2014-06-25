import { formatAddress } from './FormatUtils';

export function createUnaddressable( address, bits ) {

    return function ( value, user ) {
        throw new Error( 'Address ' + formatAddress( user, bits ) + ' is unaddressable' );
    };

};

export function createImmutable( value ) {

    return function ( ) {
        return value;
    };

};

export function createAccessor( accessor, context, ... bindings ) {

    if ( ! arguments[ 0 ] )
        throw new Error( 'Undefined accessor cannot be bound' );

    var n = bindings.length;

    return function ( a, b, c ) {

        bindings[ n + 0 ] = a;
        bindings[ n + 1 ] = b;
        bindings[ n + 2 ] = c;

        return accessor.apply( context, bindings );

    };

};

export function createPlainOldData( object, key ) {

    if ( ! object )
        throw new Error( 'An undefined object cannot be mapped' );

    return [ object, key ];

};
