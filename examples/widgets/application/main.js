import $ from 'jquery';

import { GET }                  from './request';
import { buildEngine, loadRom } from './actions';

export default ( function ( ) {

    var engine;

    var resizeDisplay = function ( ) {

        if ( ! engine )
            return ;

        engine.devices.screen.setOutputSize(
            $( '#screen .display' ).width( ),
            $( '#screen .display' ).height( )
        );
    };

    window.addEventListener( 'resize', resizeDisplay );

    return buildEngine( GET.engine ).then( newEngine => {

        engine = window.engine = newEngine;
        resizeDisplay( );

        return loadRom( engine, GET.rom );

    } ).then( function ( ) {

        $( '.overlay' ).removeClass( 'visible' );

    } ).catch( function ( e ) {

        $( '.overlay' ).removeClass( 'visible' );
        $( '.error-overlay' ).addClass( 'visible' );

    } );

} );
