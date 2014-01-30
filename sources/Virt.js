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

            engine.start = function ( ) {

                this.load.apply( this, arguments );

                this.resume( );

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

            return engine;

        }

    };

    Virt.engine = {
    };

    return Virt;

} );
