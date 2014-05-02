/*global require, module*/

require( {

    map : {
        '*' : {
            'virtjs' : '../../../libraries/base/index',
            'architectures' : '../../../libraries/architectures/'
        }
    }

}, [ 'virtjs', 'require' ], function ( Virtjs, require ) {

    window.Virtjs = Virtjs;

    require( [ module ] );

} );
