/*global Virtjs, require*/

( function ( Virtjs ) {

    Virtjs.data.LocalStorage = Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( ) {

            this.localStorage = window.localStorage;

        },

        requestSave : function ( ) {

            this.emit( 'requestSave', null );

        },

        save : function ( name, data ) {

            this._saveData( name + '.format', this._getFormat( data ) );

            this._saveTree( name + '.data', data );

        },

        restore : function ( name ) {

            var format = this._restoreData( name + '.format' );

            if ( format === null )
                return null;

            return this._restoreTree( name + '.data', format );

        },

        _getFormat : function ( data ) {

            var format = { };

            Object.keys( data ).forEach( function ( key ) {
                format[ key ] = data[ key ] && data[ key ].constructor === Object ?
                    this._getFormat( data[ key ] ) : null; }, this );

            return format;

        },

        _saveTree : function ( name, data ) {

            Object.keys( data ).forEach( function ( key ) {
                var action = data[ key ] && data[ key ] === Object ? '_saveTree' : '_saveData';
                this[ action ]( name + '.' + key, data[ key ] );
            }, this );

        },

        _saveData : function ( name, data ) {

            var serialization = this._serialize( data );

            this.localStorage.setItem( name, serialization );

        },

        _restoreTree : function ( name, format ) {

            var restored = { };

            Object.keys( format ).forEach( function ( key ) {
                restored[ key ] = this._restoreData( name + '.' + key );
            }, this );

            return restored;

        },

        _restoreData : function ( name ) {

            var serialized = this.localStorage.getItem( name );

            if ( serialized === null )
                return null;

            return this._unserialize( serialized );

        },

        _serialize : function ( data ) {

            if ( data && data.constructor === ArrayBuffer )
                return 'B' + String.fromCharCode.apply( null, new Uint8Array( data ) );

            return 'J' + JSON.stringify( data );

        },

        _unserialize : function ( data ) {

            switch ( data[ 0 ] ) {

                case 'J' :

                    return JSON.parse( data.substr( 1 ) );

                case 'B' :

                    var serialized = data.substr( 1 );
                    var buffer = new ArrayBuffer( serialized.length );

                    var bufferView = new Uint8Array( buffer );
                        for ( var t = 0, T = serialized.length; t < T; ++ t )
                            bufferView[ t ] = serialized.charCodeAt( t );

                    return bufferView;

                default:
                throw new Error( 'Cannot unserialize data' );

            }

        }

    } );

} )( window.Virtjs || require( 'virtjs' ) );
