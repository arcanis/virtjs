define( [

], function ( ) {

    return {

        fastBind : function ( fn, context /* , ...bindings */ ) {

            var argumentCount = fn.length;
            var providenArguments = Array.prototype.slice.call( arguments, 2 );

            return fn.bind.apply( fn, [ context ].concat( providenArguments ) );

            var parameterStringParts = [ ];
            for ( var t = 0, T = fn.length; t < T; ++ t )
                parameterStringParts.push( '_' + t );

            var parameterString = parameterStringParts.slice( providenArguments.length ).join( ',' );
            var argumentString = fn.length ? ',' + parameterString : '';

            for ( var t = 0, T = providenArguments.length; t < T; ++ t )
                eval( '_' + t + ' = providenArguments[' + t + '];' );

            return new Function( parameterString, 'return fn.call(context' + argumentString + ')' );

        }

    };

} );
