export function createDefensiveProxy( object ) {

    if ( typeof Proxy === 'undefined' ) {

        console.warn( 'Proxies are not available in your browser, and have been turned off.' );

        return object;

    } else {

        console.warn( 'Proxies are slows, and should not be enabled in production.' );

        return new Proxy( object, {

            get : ( target, property ) => {

                if ( property in target ) {

                    return target[ property ];

                } else {

                    throw new Error( 'Undefined property cannot be get: ' + property );

                }

            },

            set : ( target, property, value ) => {

                if ( property in target ) {

                    target[ property ] = value;

                } else {

                    throw new Error( 'Undefined property cannot be set: ' + property );

                }

            }

        } );

    }

}

export function mixin( Base, ... mixins ) {

    if ( ! Base )
        Base = class { };

    var mixed = class extends Base {

        constructor( ... parameters ) {

            super( ... parameters );

            mixins.forEach( mixin => {
                mixin.call( this );
            } );

        }

    };

    for ( var mixin of mixins ) {

        for ( var method of Object.keys( mixin.prototype ) ) {

            mixed.prototype[ method ] = mixin.prototype[ method ];

        }

    }

    return mixed;

};

export function serializeArrayBuffer( arrayBuffer ) {

    var serialization = '';

    for ( var array = new Uint8Array( arrayBuffer ), t = 0, T = array.length; t < T; ++ t )
        serialization += String.fromCharCode( array[ t ] );

    return serialization;

}

export function serialize( data ) {

    var getFormat = data => Object.keys( data ).reduce( ( format, key ) => {

        var value = data[ key ];

        if ( value instanceof ArrayBuffer ) {
            format[ key ] = 'arraybuffer';
        } else if ( value && value.constructor === Object ) {
            format[ key ] = getFormat( value );
        } else {
            format[ key ] = null;
        }

        return format;

    }, { } );

    var simplify = data => Object.keys( data ).reduce( ( simplified, key ) => {

        var value = data[ key ];

        if ( value instanceof ArrayBuffer ) {
            simplified[ key ] = serializeArrayBuffer( value );
        } else if ( value && value.constructor === Object ) {
            simplified[ key ] = simplify( value );
        } else {
            simplified[ key ] = value;
        }

        return simplified;

    }, { } );

    return JSON.stringify( {

        format : getFormat( data ),
        tree : simplify( data )

    } );

}

export function unserializeArrayBuffer( serialization ) {

    var buffer = new ArrayBuffer( serialization.length );

    var bufferView = new Uint8Array( buffer );
    for ( var t = 0, T = bufferView.length; t < T; ++ t )
        bufferView[ t ] = serialization.charCodeAt( t );

    return bufferView.buffer;

}

export function unserialize( serialization ) {

    var complexify = ( format, tree ) => Object.keys( format ).reduce( ( complexified, key ) => {

        var type = format[ key ];
        var node = tree[ key ];

        if ( type === 'arraybuffer' ) {
            complexified[ key ] = unserializeArrayBuffer( node );
        } else if ( type && type.constructor === Object ) {
            complexified[ key ] = complexify( type, node );
        } else {
            complexified[ key ] = node;
        }

        return complexified;

    }, { } );

    var { format, tree } = JSON.parse( serialization );
    return complexify( format, tree );

}
