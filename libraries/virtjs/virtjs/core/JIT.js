import { Page }  from './Page';
import { range } from '../tools';

export class JIT {

    constructor( compiler, env ) {

        this.env = env;

        this._pages = [ for ( n of range( 0, 0x100 ) ) new Page( compiler, n ) ];

        for ( var n of range( 0, this._pages.length ) ) {
            this._pages[ n ].previous = this._pages[ n - 1 ];
            this._pages[ n ].next = this._pages[ n + 1 ];
        }

    }

    invalidateAddress( address ) {

        var pageIndex = ( address & 0xFF00 ) >> 8;
        var page = this._pages[ pageIndex ];

        page.invalidate( );

        return page === this._page;

    }

    jumpTo( address ) {

        var pageIndex = ( address & 0xFF00 ) >> 8;
        var page = this._pages[ pageIndex ];

        if ( ! page )
            throw new Error( 'Invalid page index: ' + pageIndex );

        this._page = page;
        this._codePath = this._page.getFreshCodePath( address & 0x00FF );

    }

    continue( ) {

        this._running = true;

        while ( this._running ) {
            var next = this._codePath.fn( this, this.env );
            this.jumpTo( next );
        }

    }

    stop( ) {

        this._running = false;

    }

};
