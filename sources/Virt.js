define( [

], function ( ) {

    var Virt = {

        create : function ( Engine, options ) {

            var engine = new Engine( options );
            engine.status = 'pause';

            var nextTick = function ( ) {

                engine.cycle( );

                if ( engine.status === 'running' ) {
                    options.timer.tick( nextTick );
                }

            };

            engine.pause = function ( ) {

                if ( this.status !== 'running' )
                    return ;

                this.status = 'pause';

            };

            engine.resume = function ( ) {

                if ( this.status !== 'pause' )
                    return ;

                this.status = 'running';
                nextTick( );

            };

            engine.initialize( );

            return function ( data ) {

                engine.load( data );
                engine.resume( );

            };

        }

    };

    Virt.engine = {
    };

    return Virt;

} );
