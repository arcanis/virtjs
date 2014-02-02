define( [

], function ( ) {

    return {

        image : function ( canvas ) {

            var width = canvas.width, height = canvas.height;
            var url = canvas.toDataUrl( );

            console.log( '%c', ( function ( properties ) {

                return Object.keys( properties ).map( function ( name ) {
                    return name.replace( /([A-Z])/g, '-$1' ).toLowerCase( ) + ':' + properties[ name ];
                } ).join( ';' );

            } )( {

                lineHeight : 0,
                paddingLeft : width + 'px',
                paddingTop : height + 'px',
                backgroundImage : 'url(' + url + ')'

            } ) );

        }

    };

} );
