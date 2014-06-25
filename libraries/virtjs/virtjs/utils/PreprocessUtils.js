import { ParseTreeTransformer } from 'traceur/codegeneration/ParseTreeTransformer';
import { FindVisitor }          from 'traceur/codegeneration/FindVisitor';
import { ParseTreeWriter }      from 'traceur/outputgeneration/ParseTreeWriter';
import { AnonBlock }            from 'traceur/syntax/trees/ParseTrees';
import { Parser }               from 'traceur/syntax/Parser';
import { SourceFile }           from 'traceur/syntax/SourceFile';

var root = this; // 'window' or 'global'

class PreprocessVariableAnalysis extends FindVisitor {

    visitIdentifierExpression( expression ) {

        this.found = expression.identifierToken.value === 'preprocess';

    }

};

class StaticIfTransformer extends ParseTreeTransformer {

    constructor( preprocess ) {

        this.preprocess = preprocess;

    }

    transformIfStatement( statement ) {

        var analysis = new PreprocessVariableAnalysis( );
        analysis.visitAny( statement.condition );

        if ( ! analysis.found )
            return super( statement );

        var codeGenerator = new ParseTreeWriter( );
        codeGenerator.visitAny( statement.condition );

        var condition = codeGenerator.toString( );
        var result = new Function( 'preprocess', 'return ' + condition )( this.preprocess );

        var branch = result ? statement.ifClause : statement.elseClause;

        if ( ! branch )
            branch = new AnonBlock( null, [ ] );

        return preprocessTree( branch, this.preprocess );

    }

};

function preprocessTree( tree, preprocess ) {

    var transformer = new StaticIfTransformer( preprocess );

    return tree.transform( transformer );

};

export function preprocessFunction( func, preprocess ) {

    var source = func.toString( );

    var file = new SourceFile( 'fn.js', source );

    var parser = new Parser( file );
    var expression = parser.parseExpression( );

    var generator = new ParseTreeWriter( );
    generator.visitAny( preprocessTree( expression, preprocess ) );

    return new Function( '', 'return (' + generator.toString( ) + ')' )( );

};

export function preprocessMethods( instance, methods, preprocess ) {

    methods.forEach( name => {

        if ( ! instance[ name ] )
            return ;

        Object.defineProperty( instance, name, {
            value : preprocessFunction( instance[ name ], preprocess ),
            enumerable : false
        } );

    } );

};

export function resetFunction( func, options = { } ) {

    var keys = Object.keys( options.scope || { } );
    var values = keys.map( key => options.scope[ key ] );

    var source = func.toString( );

    var scopeCreator = new Function( keys.join( ',' ), 'return (' + source + ')' );
    var scoped = scopeCreator.apply( null, values );

    return scoped;

};
