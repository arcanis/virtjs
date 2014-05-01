/*global angular*/

angular.module( 'basicAuth', [ ] )

    .service( 'basicAuth', function ( ) {

        var parser = document.createElement( 'a' );

        this.authorization = function ( src ) {

            parser.href = src;

            if ( ! parser.username && ! parser.password )
                return undefined;

            return 'Basic ' + window.btoa( parser.username + ':' + parser.password );

        };

    } )

;
