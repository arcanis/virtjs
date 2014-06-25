export function mixin( Base, ... mixins ) {

    if ( ! Base )
        Base = class { };

    var mixed = class extends Base {

        constructor( ... parameters ) {

            super( ... parameters );

            mixins.forEach( mixin => {
                mixin.call( this );
            } );

        }

    };

    for ( var mixin of mixins ) {

        for ( var method of Object.keys( mixin.prototype ) ) {

            mixed.prototype[ method ] = mixin.prototype[ method ];

        }

    }

    return mixed;

};
