import { EmitterMixin } from '../../mixins/EmitterMixin';
import { mixin }        from '../../utils/ObjectUtils';

export class LocalStorageData extends mixin( null, EmitterMixin ) {

    constructor( ) {

        this._localStorage = window.localStorage;

    }

    requestSave( ) {

        this.emit( 'requestSave', null );

    }

    save( name, data ) {

        this._saveData( name + '.format', this._getFormat( data ) );

        this._saveTree( name + '.data', data );

    }

    restore( name ) {

        var format = this._restoreData( name + '.format' );

        if ( format === null )
            return null;

        return this._restoreTree( name + '.data', format );

    }

    _getFormat( data ) {

        // { "a" : 42, "b" : { "c" : [ ] } }
        //   ->
        // { "a" : null, "b" : { "c" : null } }

        var format = { };

        Object.keys( data ).forEach( key => {

            var isFieldAnObject = data[ key ] && data[ key ].constructor === Object;

            format[ key ] = isFieldAnObject? this._getFormat( data[ key ] ) : null;

        } );

        return format;

    }

    _saveTree( name, data ) {

        Object.keys( data ).forEach( key => {

            var isFieldAnObject = data[ key ] && data[ key ] === Object;

            var action = isFieldAnObject? '_saveTree' : '_saveData';
            this[ action ]( name + '.' + key, data[ key ] );

        } );

    }

    _saveData( name, data ) {

        var serialization = this._serialize( data );

        this._localStorage.setItem( name, serialization );

    }

    _restoreTree( name, format ) {

        var restored = { };

        Object.keys( format ).forEach( key => {
            restored[ key ] = this._restoreData( name + '.' + key );
        } );

        return restored;

    }

    _restoreData( name ) {

        var serialized = this._localStorage.getItem( name );

        if ( serialized === null )
            return null;

        return this._unserialize( serialized );

    }

    _serialize( data ) {

        if ( data && data.constructor === ArrayBuffer )
            return 'B' + String.fromCharCode.apply( null, new Uint8Array( data ) );

        return 'J' + JSON.stringify( data );

    }

    _unserialize( data ) {

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

};
