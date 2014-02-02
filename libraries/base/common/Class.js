define( [

    '../common/Object'

], function ( ObjectUtil ) {

    var Class = function ( dynamics, statics ) {

        this._options = arguments[ this.initialize.length ] || { };

        this.initialize.apply( this, arguments );

    };

    Class.extend = function ( mixins, dynamics, statics ) {

        if ( ! ( mixins instanceof Array ) )
            statics = dynamics, dynamics = mixins, mixins = [ ];

        var NewClass = function ( ) {
            Class.apply( this, arguments ); };

        var Inheritor = function ( ) { };
        Inheritor.prototype = this.prototype;
        NewClass.prototype = new Inheritor( );

        mixins.forEach( function ( mixin ) {
            ObjectUtil.extend( NewClass.prototype, mixin );
        } );

        ObjectUtil.extend( NewClass, this, statics );
        ObjectUtil.extend( NewClass.prototype, dynamics );

        return NewClass;

    };

    Class.prototype.initialize = function ( ) {

    };

    return Class;

} );
