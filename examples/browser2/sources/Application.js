/*global angular*/

angular.module( 'application', [ 'ngRoute', 'reverse', 'emulator', 'sizeMonitoring', 'buttonToKey' ] )

    .config( [ '$routeProvider', function ( $routeProvider ) {

        $routeProvider.when( '/:server', {
            name : 'file-list',
            templateUrl : 'templates/file-list.html',
            controller : 'fileList'
        } );

        $routeProvider.when( '/:server/:rom*', {
            name : 'run-rom',
            templateUrl : 'templates/run-rom.html',
            controller : 'runRom'
        } );

    } ] )

    .controller( 'fileList', [ '$scope', '$routeParams', '$http', 'reverse', 'basicAuth', function ( $scope, $routeParams, $http, reverse, basicAuth ) {

        var server = window.atob( $routeParams.server );

        var authorization = basicAuth.authorization( server );

        var parser = document.createElement( 'a' );
        parser.href = server;

        $scope.name = parser.host;

        $http.get( server + '/filelist.json', {

            headers : { authorization : authorization }

        } ).success( function ( data ) {

            $scope.roms = data.map( function ( src ) {

                var name = src.replace( /^.*\//, '' );

                return { name : name, href : '#' + reverse( 'run-rom', {
                    server : window.btoa( server ),
                    rom : src
                } ) };

            } );

        } );

    } ] )

    .controller( 'runRom', [ '$scope', '$routeParams', function ( $scope, $routeParams ) {

        var server = window.atob( $routeParams.server );

        $scope.emulator = { type : 'GameBoy', rom : server + '/' + $routeParams.rom };

    } ] );

;
