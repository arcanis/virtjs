( function ( ) {

    var requestFrame = window.requestAnimationFrame;
    var cancelFrame = window.cancelAnimationFrame;

    var resetTriggers = function ( element ) {

        var triggers = element.__resizeTriggers__,
            expand = triggers.firstElementChild,
            contract = triggers.lastElementChild,
            expandChild = expand.firstElementChild;

        contract.scrollLeft = contract.scrollWidth;
        contract.scrollTop = contract.scrollHeight;

        expandChild.style.width = expand.offsetWidth + 1 + 'px';
        expandChild.style.height = expand.offsetHeight + 1 + 'px';

        expand.scrollLeft = expand.scrollWidth;
        expand.scrollTop = expand.scrollHeight;

    };

    var checkTriggers = function ( element ) {
        return element.offsetWidth  != element.__resizeLast__.width
            || element.offsetHeight != element.__resizeLast__.height
        ;
    };

    var scrollListener = function ( e ) {

        resetTriggers( this );

        if ( this.__resizeRAF__ )
            window.cancelAnimationFrame( this.__resizeRAF__ );

        this.__resizeRAF__ = window.requestAnimationFrame( function ( ) {

            if ( ! checkTriggers( this ) )
                return ;

            this.__resizeLast__.width = this.offsetWidth;
            this.__resizeLast__.height = this.offsetHeight;
            this.__resizeListeners__.forEach( function( fn ) {
                fn.call( this, e );
            } );

        }.bind( this ) );

    };

    window.addResizeListener = function ( element, fn ) {

        if ( ! element.__resizeTriggers__ ) {

            if ( window.getComputedStyle( element ).position === 'static' )
                element.style.position = 'relative';

            element.__resizeLast__ = { };
            element.__resizeListeners__ = [ ];

            element.__resizeTriggers__ = document.createElement( 'div' );
            element.__resizeTriggers__.className = 'resize-triggers';
            element.__resizeTriggers__.innerHTML = [
                '<div class="expand-trigger"><div></div></div>',
                '<div class="contract-trigger"></div>'
            ].join( '' );

            element.appendChild( element.__resizeTriggers__ );
            element.addEventListener( 'scroll', scrollListener, true );

            resetTriggers( element );

        }

        element.__resizeListeners__.push( fn );

    };

    window.removeResizeListener = function ( element, fn ) {

        element.__resizeListeners__.splice( element.__resizeListeners__.indexOf( fn ), 1 );

        if ( element.__resizeListeners__.length )
            return ;

        element.removeEventListener( 'scroll', scrollListener );
        element.__resizeTriggers__ = ! element.removeChild( element.__resizeTriggers__ );

    };

} )( );
