import { CodePath } from './CodePath';

export class VersionedPage {

    constructor( baseAddress, size ) {

        this._compiler = null;
        this._previous = null;

        this._codePaths = [ ];

        this._overflows = [ ];
        this._maxOverflow = 0;
        this._timeBeforeOverflowCheck = 0;

        for ( var localAddress = 0; localAddress < size; ++ localAddress ) {

            var maxSize = size - localAddress;

            var codePath = new CodePath( baseAddress + localAddress, { maxSize } );
            this._codePaths.push( codePath );

        }

    }

    link( { compiler } ) {

        this._compiler = compiler;
        this._timeBeforeOverflowCheck = 0;

        for ( var codePath of this._codePaths ) {
            codePath.link( { compiler } );
            codePath.upToDate = false;
        }

    }

    invalidateOverflows( distance ) {

        if ( distance >= this._maxOverflow )
            return ;

        if ( this._timeBeforeOverflowCheck <= 0 ) {
            this._updateOverflowList( );
            this._timeBeforeOverflowCheck = 100;
        }

        for ( var codePath of this._overflows ) {
            if ( codePath.overflow > distance ) {
                codePath.upToDate = false;
            }
        }

    }

    invalidateAddress( localAddress ) {

        if ( this.previous )
            this.previous.invalidateOverflows( localAddress );

        for ( var address = 0; address <= localAddress; ++ address ) {

            var codePath = this._codePaths[ address ];

            if ( codePath.end > localAddress ) {
                codePath.upToDate = false;
            }

        }

    }

    getFreshCodePath( localAddress ) {

        var codePath = this._codePaths[ localAddress ];

        if ( ! codePath.upToDate ) {

            var wasOverflowing = codePath.overflow > 0;

            codePath.rebuild( );

            var isOverflowing = codePath.overflow > 0;

            if ( ! wasOverflowing && isOverflowing ) {

                this._overflows.push( codePath );

                if ( codePath.overflow > this._maxOverflow ) {
                    this._maxOverflow = codePath.overflow;
                }

            } else if ( wasOverflowing && ! isOverflowing ) {

                this._timeBeforeOverflowCheck -= 1;

            }

        }

        return codePath;

    }

    _updateOverflowList( ) {

        this._overflows.length = 0;
        this._maxOverflow = 0;

        for ( var codePath of this._codePaths ) {

            if ( ! codePath.upToDate )
                continue ;

            if ( codePath.overflow !== 0 )
                this._overflows.push( codePath );

            if ( codePath.overflow > this._maxOverflow ) {
                this._maxOverflow = codePath.overflow;
            }

        }

    }

}
