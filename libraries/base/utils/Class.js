define( [

    './Object'

], function ( ObjectUtil ) {

    var Class = function ( ) {

        var instance = this;

        instance._options = arguments[ instance.initialize.length ] || { };

        instance.initialize.apply( instance, arguments );

    };

    Class.extend = function ( mixins, dynamics, statics ) {

        if ( ! ( mixins instanceof Array ) )
            statics = dynamics, dynamics = mixins, mixins = [ ];

        var NewClass = function ( ) {
            return Class.apply( this, arguments ); };

        var Inheritor = function ( ) { };
        Inheritor.prototype = this.prototype;
        NewClass.prototype = new Inheritor( );
        NewClass.prototype.constructor = NewClass;

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
