export class PageSet {

    constructor( PageType, baseAddress, size ) {

        this._PageType = PageType;

        this._baseAddress = baseAddress;
        this._size = size;

        this._compiler = null;

        this._previous = null;

        this._pages = [ ];
        this._page = null;

    }

    link( { compiler } ) {

        this._compiler = compiler;

    }

    switchTarget( target ) {

        if ( ! this._pages[ target ] ) {

            var PageType = this._PageType;

            var page = this._pages[ target ] = new PageType( this._baseAddress, this._size );
            var previous = this.previous;

            page.previous = previous;
            page.link( { compiler : this._compiler } );

        }

        this._page = this._pages[ target ];

        if ( this.previous ) {
            this.previous.invalidateOverflows( +Infinity );
        }

    }

    invalidateOverflows( distance ) {

        this._page.invalidateOverflows( distance );

    }

    invalidateAddress( localAddress ) {

        this._page.invalidateAddress( localAddress );

    }

    getFreshCodePath( localAddress ) {

        return this._page.getFreshCodePath( localAddress );

    }


}
