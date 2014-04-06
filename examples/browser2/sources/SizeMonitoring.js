/*global angular*/

angular.module( 'sizeMonitoring', [ ] )

    .directive( 'sizeMonitoring', [ '$parse', function ( $parse ) {

        return {

            restrict : 'A',

            link : function ( $scope, $element, $attrs ) {

                var element = $element[ 0 ];
                var target = $parse( $attrs.sizeMonitoring ).assign;

                var onResize = function ( ) {

                    $scope.$apply( function ( ) {

                        target( $scope, {
                            width : element.offsetWidth,
                            height : element.offsetHeight
                        } );

                    } );

                };

                window.addResizeListener( element, onResize );

                $scope.$on( '$destroy', function ( ) {
                    window.removeResizeListener( element, onResize );
                } );

            }

        };

    } ] )

;
