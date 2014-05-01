/*global angular, Virtjs, SparkMD5*/

angular.module( 'emulator', [ 'basicAuth', 'emulatorTypes' ] )

    .directive( 'emulator', [ '$http', 'basicAuth', 'emulatorTypes', function ( $http, basicAuth, emulatorTypes ) {

        var engines = [ ];

        window.addEventListener( 'unload', function ( ) {
            engines.forEach( function ( engine ) {
                engine._options.devices.data.requestSave( );
            } );
        } );

        return {

            restrict : 'E',
            template : '<canvas tabindex="-1"></canvas>',

            scope : {
                type : '@',
                rom : '@',
                width : '@',
                height : '@'
            },

            link : function ( $scope, $element, $attrs ) {

                var element = $element[ 0 ];
                var canvas = $element.find( 'canvas' )[ 0 ];

                var screen = new Virtjs.screen.WebGL( { element : canvas } );
                var timer = new Virtjs.timer.RAFrame( );
                var data = new Virtjs.data.LocalStorage( );

                // Those two components depends on the Virtjs engine type
                var input, engine;

                var buildEngine = function ( type ) {

                    if ( ! type )
                        return ;

                    if ( ! emulatorTypes[ type ] )
                        throw new Error( 'Unknown emulator type: ' + type );

                    if ( input )
                        input.destroy( );

                    if ( engine )
                        engine.pause( );

                    input = new Virtjs.input.Keyboard( {

                        element : canvas,

                        map : emulatorTypes[ type ].keyboardMap

                    } );

                    engine = window.engine = Virtjs.create( emulatorTypes[ type ].engine, {

                        devices : {
                            screen : screen,
                            input : input,
                            timer : timer,
                            data : data
                        },

                        skipBios : true,

                        iterationCountPerFrame : 1

                    } );

                    engines.push( engine );

                    loadRom( $scope.rom );
                    resizeOutput( $scope.width, $scope.height );

                };

                var loadRom = function ( rom ) {

                    if ( ! rom )
                        return ;

                    var authorization = basicAuth.authorization( rom );

                    $http.get( rom, {

                        responseType : 'arraybuffer',
                        headers : { authorization : authorization }

                    } ).success( function ( data ) {

                        if ( rom !== $scope.rom )
                            return ;

                        var ident = SparkMD5.ArrayBuffer.hash( data );

                        engine.load( data, { ident : ident } );

                    } );

                };

                var resizeOutput = function ( width, height ) {

                    if ( ! width || ! height )
                        return ;

                    screen.setOutputSize( width, height );

                };

                $scope.$watch( 'type', function ( ) {

                    buildEngine( $scope.type.toLowerCase( ) );

                } );

                $scope.$watch( 'rom', function ( src ) {

                    loadRom( $scope.src );

                } );

                $scope.$watchCollection( '[ width, height ]', function ( ) {

                    resizeOutput( $scope.width, $scope.height );

                } );

                $scope.$on( '$destroy', function ( ) {

                    if ( ! engine )
                        return ;

                    engine._options.data.requestSave( );
                    engines.splice( engines.indexOf( engine ), 1 );

                    engine.pause( );

                } );

            }

        };

    } ] )

;
