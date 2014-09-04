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

export function serialize( data ) {

    var getFormat = data => Object.keys( data ).reduce( ( format, key ) => {

        if ( data[ key ] instanceof Buffer ) {
            format[ key ] = 'arraybuffer';
        } else if ( data && data.constructor === Object ) {
            format[ key ] = getFormat( data[ key ] );
        } else {
            format[ key ] = null;
        }

        return format;

    }, { } );

    var simplify = data => Object.keys( data ).reduce( ( simplified, key ) => {

        if ( data[ key ] instanceof Buffer ) {
            simplified[ key ] = String.fromCharCode.apply( null, new Uint8Array( data[ key ] ) );
        } else if ( data && data.constructor === Object ) {
            simplified[ key ] = simplify( data[ key ] );
        } else {
            simplified[ key ] = data[ key ];
        }

        return simplified;

    }, { } );

    return JSON.stringify( {

        format : getFormat( data ),
        tree : simplify( data )

    } );

}

export function unserialize( serialization ) {

    var unserializeArrayBuffer = serialization => {

        var buffer = new ArrayBuffer( serialization.length );

        var bufferView = new Uint8Array( buffer );
        for ( var t = 0, T = bufferView.length; t < T; ++ t )
            bufferView[ t ] = serialization.charCodeAt( t );

        return bufferView;

    };

    var complexify = ( format, tree ) => Object.keys( format ).reduce( ( complexified, key ) => {

        if ( format[ key ] === 'arraybuffer' ) {
            complexified[ key ] = unserializeArrayBuffer( tree[ key ] );
        } else if ( format && format.constructor === Object ) {
            complexified[ key ] = complexify( format[ key ], tree[ key ] );
        } else {
            complexified[ key ] = tree[ key ];
        }

        return complexified;

    }, { } );

    var { format, tree } = JSON.parse( serialization );
    return complexify( format, tree );

}
