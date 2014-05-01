/*global angular*/

angular.module( 'buttonToKey', [ ] )

    .directive( 'buttonToKey', function ( ) {

        return {

            restrict : 'A',

            link : function ( $scope, $element, $attrs ) {

                var match = $attrs.buttonToKey.match( /^([0-9]+) to (.*)$/ );

                if ( ! match )
                    throw new Error( 'The buttonToKey directive expects a parameter similar to "<key> to <selector>"' );

                var keyCode = parseInt( match[ 1 ] );
                var selector = match[ 2 ];

                var send = function ( type ) {

                    var event = document.createEvent( 'Events' );
                    event.initEvent( type, true, true );
                    event.keyCode = keyCode;
                    event.which = keyCode;

                    var target = document.querySelectorAll( selector );

                    Array.prototype.forEach.call( target, function ( element ) {
                        element.dispatchEvent( event );
                    }.bind( this ) );

                };

                $element.on( 'vmousedown', function ( ) {
                    send( 'keydown' );
                } );

                $element.on( 'vmouseup', function ( ) {
                    send( 'keyup' );
                } );

            }

        };

    } )

;
