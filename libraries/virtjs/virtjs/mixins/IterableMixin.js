export class IterableMixin {

    slice( from, count ) {

        var length = this.length( );

        if ( typeof from === 'undefined' )
            from = 0;

        if ( typeof count === 'undefined' )
            count = length;

        var begin = from < 0 ? length + from : from;
        var end = Math.min( begin + count, length );

        var subset = [ ];

        for ( var t = begin; t < end; ++ t )
            subset.push( this.at( t ) );

        return subset;

    }

    forEach( callback, context ) {

        for ( var t = 0, T = this.length( ); t < T; ++ t ) {
            callback.call( context, this.at( t ), t, this );
        }

    }

    map( callback, context ) {

        var result = [ ];

        for ( var t = 0, T = this.length( ); t < T; ++ t )
            result.push( callback.call( context, this.at( t ), t, this ) );

        return result;

    }

    filter( callback, context ) {

        var result = [ ];

        for ( var t = 0, T = this.length( ); t < T; ++ t ) {

            var element = this.at( t );

            if ( callback.call( context, element, t, this ) ) {
                result.push( element );
            }

        }

        return result;

    }

    reduce( callback, previous, context ) {

        var index = 0;

        if ( typeof previous === 'undefined' )
            previous = this.at( index ++ );

        for ( var length = this.length( ); index < length; ++ index )
            previous = callback.call( context, previous, this.at( index ), index, this );

        return previous;

    }

};
