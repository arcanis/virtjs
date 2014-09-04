export class JIT {

    constructor( { } ) {

        this._compiler = null;
        this._environment = null;

        this._addressSize = 16;
        this._pageIndexBits = 4;
        this._pagePointerBits = this._addressSize - this._pageIndexBits;

        this._addressMask = ~ ( ( ~ 0 ) >>> this._addressSize << this._addressSize >>> 0 ); // 0xffff
        this._pagePointerMask = ( ( 1 << this._pagePointerBits ) - 1 ) >>> 0;               // 0x0fff
        this._pageIndexMask = ( ( ~ this._pagePointerBits ) & this._addressMask ) >>> 0;    // 0xf000
        this._pageCount = 1 << this._pageIndexBits >>> 0;                                   // 16
        this._pageSize = 1 << this._pagePointerBits >>> 0;                                  // 4096

        this._pages = [ ];
        this._sets = { };

    }

    link( { compiler } ) {

        this._compiler = compiler;

    }

    setup( environment ) {

        this._environment = environment;

    }

    declarePageSet( name, begin, end, Page ) {

        var set = this._sets[ name ] = [ ];

        var startIndex = begin >>> this._pagePointerBits;
        var endIndex = end >>> this._pagePointerBits;

        for ( var index = startIndex; index <= endIndex; ++ index ) {

            var baseAddress = index * this._pageSize;
            var pageSize = this._pageSize;

            var previous = this._pages[ index - 1 ] || null;
            var page = this._pages[ index ] = new Page( baseAddress, pageSize );

            page.previous = previous;
            page.link( { compiler : this._compiler } );

            set.push( page );

        }

    }

    switchPageSetTarget( name, version ) {

        for ( var page of this._sets[ name ] ) {
            page.switchTarget( version );
        }

    }

    invalidateAddress( address, version = null ) {

        var pageIndex = address >>> this._pagePointerBits;
        var pagePointer = address & this._pagePointerMask;

        var page = this._pages[ pageIndex ];
        page.invalidateAddress( pagePointer );

        return this;

    }

    jumpTo( address ) {

        var pageIndex = address >>> this._pagePointerBits;
        var pagePointer = address & this._pagePointerMask;

        var page = this._page = this._pages[ pageIndex ];
        this._codePath = page.getFreshCodePath( pagePointer );

        console.assert( this._codePath );

    }

    stillValid( ) {

        return this._codePath && this._codePath.upToDate;

    }

    stop( ) {

        this._running = false;

    }

    resume( ) {

        this._running = true;

        do {

            var next = this._codePath.fn( this, this._environment );
            this.jumpTo( next );

        } while ( this._running );

    }

}
