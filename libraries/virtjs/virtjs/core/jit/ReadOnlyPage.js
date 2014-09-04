import { CodePath } from './CodePath';

export class ReadOnlyPage {

    constructor( baseAddress, size ) {

        this._compiler = null;
        this._previous = null;

        this._codePaths = [ ];

        this._overflows = null;
        this._maxOverflow = 0;

        for ( var localAddress = 0; localAddress < size; ++ localAddress ) {

            var maxSize = size - localAddress;

            var codePath = new CodePath( baseAddress + localAddress, { maxSize } );
            this._codePaths.push( codePath );

        }

    }

    link( { compiler } ) {

        this._compiler = compiler;

        this._overflows = [ ];
        this._maxOverflow = 0;

        for ( var codePath of this._codePaths ) {

            codePath.link( { compiler } );
            codePath.rebuild( );

            if ( codePath.overflow !== 0 )
                this._overflows.push( codePath );

            if ( codePath.overflow > this._maxOverflow ) {
                this._maxOverflow = codePath.overflow;
            }

        }

    }

    invalidateOverflows( distance ) {

        if ( distance >= this._maxOverflow )
            return ;

        for ( var codePath of this._overflows ) {

            if ( codePath.overflow > distance ) {

                codePath.rebuild( );

            }

        }

    }

    invalidateAddress( localAddress ) {

        // Every invalidation will be ignored.

    }

    getFreshCodePath( localAddress ) {

        return this._codePaths[ localAddress ];

    }

}
