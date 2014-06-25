import { CodePath } from './CodePath';
import { range }    from '../tools';

export class Page {

    constructor( compiler, pageIndex ) {

        this._invalidated = true;

        this._codePaths = [ for ( n of range( 0, 0x100 ) ) new CodePath( compiler, pageIndex * 0x100, n ) ];

    }

    invalidate( ) {

        if ( this._invalidated )
            return ;

        this._invalidated = true;
        this.doesOverflow = false;

        if ( this.previous && this.previous.doesOverflow )
            this.previous.invalidate( );

        if ( this.next && this.doesOverflow )
            this.next.invalidate( );

        for ( var codePath of this._codePaths ) {
            codePath.invalidate( );
        }

    }

    getFreshCodePath( address ) {

        this._invalidated = false;

        var codePath = this._codePaths[ address ];

        if ( codePath.keepUpToDate( ) && codePath.doesOverflow )
            this.doesOverflow = true;

        return codePath;

    }

};
