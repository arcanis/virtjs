define( [

    'base'

], function ( Virtjs ) {

    return Virtjs.ClassUtil.extend( [

        Virtjs.EmitterMixin

    ], {

        initialize : function ( map ) {

            console.log( map );

            this._map = map;

        },

        open : function ( element ) {

            element.addEventListener( 'keydown', function ( e ) {

                if ( typeof this._map[ e.keyCode ] === 'undefined' )
                    return ;

                this.emit( 'keydown', this._map[ e.keyCode ] );

            }.bind( this ) );

            element.addEventListener( 'keyup', function ( e ) {

                if ( typeof this._map[ e.keyCode ] === 'undefined' )
                    return ;

                this.emit( 'keyup', this._map[ e.keyCode ] );

            }.bind( this ) );

        }

    } );

} );
