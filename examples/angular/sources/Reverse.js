/*global angular*/

angular.module( 'reverse', [ 'ngRoute' ] )

    .factory( 'reverse', [ '$route', function ( $route ) {

        var routeParameterRegexp = /:(\w+)([?*]?)/g;

        var match = function ( name, parameters ) {

            return Object.keys( $route.routes ).filter( function ( route ) {

                if ( $route.routes[ route ].name !== name )
                    return false;

                for ( var parameter; parameter = routeParameterRegexp.exec( route ); )
                    if ( parameter[ 2 ].length === 0 && parameters[ parameter[ 1 ] ] == null )
                        return false;

                return true;

            } );

        };

        return function ( name, parameters ) {

            var routes = match( name, parameters );

            if ( routes.length === 0 )
                throw new Error( 'Route not found: ' + name );

            if ( routes.length > 1 )
                throw new Error( 'Ambiguous route name: ' + name );

            return routes[ 0 ].replace( /:(\w+)[?*]?/g, function ( _, key ) {

                return parameters[ key ];

            } );

        };

    } ] )

;
