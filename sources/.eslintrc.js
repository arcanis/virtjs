var WARNING = 1;
var ERROR = 2;

module.exports = {

    parser: "babel-eslint",

    env: {
        "browser": true,
        "es6": true,
        "node": true
    },

    globals: {
        "module": true,
        "require": true
    },

    parserOptions: {
        sourceType: "module",
        ecmaFeatures: {
            blockBindings: true,
            experimentalObjectRestSpread: true,
            jsx: true
        }
    },

    plugins: [
        "arca",
        "import"
    ],

    settings: {
        "import/resolver": "webpack",
        "import/ignore": [ "node_modules", "\.(scss|jpg|gif|json)$" ]
    },

    rules: {

        ////////////////////////
        // POSSIBLE ERRORS

        "no-cond-assign": [
            ERROR
        ],
        "no-console": [
            ERROR
        ],
        "no-debugger": [
            ERROR
        ],
        "no-dupe-args": [
            ERROR
        ],
        "no-dupe-keys": [
            ERROR
        ],
        "no-duplicate-case": [
            ERROR
        ],
        "no-empty": [
            ERROR
        ],
        "no-extra-boolean-cast": [
            ERROR
        ],
        "no-extra-parens": [
            ERROR
        ],
        "no-extra-semi": [
            ERROR
        ],
        "no-func-assign": [
            ERROR
        ],
        "no-invalid-regexp": [
            ERROR
        ],
        "no-irregular-whitespace": [
            ERROR
        ],
        "no-negated-in-lhs": [
            ERROR
        ],
        "no-sparse-arrays": [
            ERROR
        ],
        "no-unexpected-multiline": [
            ERROR
        ],
        "no-unreachable": [
            ERROR
        ],
        "use-isnan": [
            ERROR
        ],
        "valid-typeof": [
            ERROR
        ],

        "array-callback-return": [
            ERROR
        ],
        "consistent-return": [
            ERROR
        ],
        "dot-location": [
            ERROR,
            "property"
        ],
        "eqeqeq": [
            ERROR,
            "allow-null"
        ],
        "no-caller": [
            ERROR
        ],
        "no-case-declarations": [
            ERROR
        ],
        "no-empty-function": [
            ERROR,
            { allow: [ "arrowFunctions" ] }
        ],
        "no-eq-null": [
            ERROR
        ],
        "no-eval": [
            ERROR
        ],
        "no-extend-native": [
            ERROR
        ],
        "no-extra-bind": [
            ERROR
        ],
        "no-extra-label": [
            ERROR
        ],
        "no-fallthrough": [
            ERROR
        ],
        "no-floating-decimal": [
            ERROR
        ],
        "no-implicit-coercion": [
            ERROR
        ],
        "no-implied-eval": [
            ERROR
        ],
        "no-labels": [
            ERROR
        ],
        "no-lone-blocks": [
            ERROR
        ],
        "no-magic-numbers": [
            ERROR,
            { ignore: [ -1, 0, 1, 2, 100 ] }
        ],
        "no-multi-spaces": [
            ERROR,
            { exceptions: { VariableDeclarator: true, ImportDeclaration: true } }
        ],
        "no-multi-str": [
            ERROR
        ],
        "no-native-reassign": [
            ERROR
        ],
        "no-new": [
            ERROR
        ],
        "no-new-func": [
            ERROR
        ],
        "no-new-wrappers": [
            ERROR
        ],
        "no-octal": [
            ERROR
        ],
        "no-proto": [
            ERROR
        ],
        "no-return-assign": [
            ERROR
        ],
        "no-script-url": [
            ERROR
        ],
        "no-self-assign": [
            ERROR
        ],
        "no-self-compare": [
            ERROR
        ],
        "no-sequences": [
            ERROR
        ],
        "no-throw-literal": [
            ERROR
        ],
        "no-unmodified-loop-condition": [
            ERROR
        ],
        "no-unused-expressions": [
            ERROR,
            { allowShortCircuit: true }
        ],
        "no-useless-call": [
            ERROR
        ],
        "no-useless-concat": [
            ERROR
        ],
        "no-void": [
            ERROR
        ],
        "no-warning-comments": [
            WARNING
        ],
        "no-with": [
            ERROR
        ],
        "radix": [
            ERROR
        ],
        "wrap-iife": [
            ERROR
        ],
        "yoda": [
            ERROR,
            "never"
        ],

        ////////////////////////
        // VARIABLES

        "no-catch-shadow": [
            ERROR
        ],
        "no-delete-var": [
            ERROR
        ],
        "no-restricted-globals": [
            ERROR,
            "event"
        ],
        "no-shadow": [
            ERROR
        ],
        "no-shadow-restricted-names": [
            ERROR
        ],
        "no-undef": [
            ERROR
        ],
        "no-undefined": [
            ERROR
        ],
        "no-unused-vars": [
            ERROR,
            { args: "none" }
        ],
        "no-use-before-define": [
            ERROR
        ],

        ////////////////////////
        // STYLISTIC ISSUES

        "array-bracket-spacing": [
            ERROR,
            "always"
        ],
        "block-spacing": [
            ERROR,
            "always"
        ],
        "brace-style": [
            ERROR
        ],
        "camelcase": [
            ERROR,
            { properties: "never" }
        ],
        "comma-spacing": [
            ERROR
        ],
        "comma-style": [
            ERROR
        ],
        "computed-property-spacing": [
            ERROR
        ],
        "eol-last": [
            ERROR
        ],
        "func-names": [
            ERROR
        ],
        "func-style": [
            ERROR,
            "declaration",
            { allowArrowFunctions: true }
        ],
        "indent": [
            ERROR,
            4,
            { SwitchCase: 1 }
        ],
        "key-spacing": [
            ERROR
        ],
        "linebreak-style": [
            ERROR,
            "unix"
        ],
        "lines-around-comment": [
            ERROR
        ],
        "new-cap": [
            ERROR
        ],
        "new-parens": [
            ERROR
        ],
        "no-array-constructor": [
            ERROR
        ],
        "no-lonely-if": [
            ERROR
        ],
        "no-mixed-spaces-and-tabs": [
            ERROR
        ],
        "no-multiple-empty-lines": [
            ERROR
        ],
        "no-nested-ternary": [
            ERROR
        ],
        "no-new-object": [
            ERROR
        ],
        "no-spaced-func": [
            ERROR
        ],
        "no-trailing-spaces": [
            ERROR
        ],
        "no-underscore-dangle": [
            ERROR
        ],
        "no-whitespace-before-property": [
            ERROR
        ],
        "object-curly-spacing": [
            ERROR,
            "always"
        ],
        "one-var": [
            ERROR,
            "never"
        ],
        "padded-blocks": [
            ERROR,
            { switches: "always", classes: "always" }
        ],
        "quote-props": [
            ERROR,
            "consistent-as-needed"
        ],
        "quotes": [
            ERROR,
            "backtick"
        ],
        "semi": [
            ERROR,
            "always"
        ],
        "semi-spacing": [
            ERROR
        ],
        "space-before-blocks": [
            ERROR
        ],
        "space-before-function-paren": [
            ERROR,
            { anonymous: "always", named: "never" }
        ],
        "space-in-parens": [
            ERROR
        ],
        "space-infix-ops": [
            ERROR
        ],
        "space-unary-ops": [
            ERROR
        ],
        "spaced-comment": [
            ERROR
        ],

        ////////////////////////
        // ECMASCRIPT 6

        "arrow-spacing": [
            ERROR
        ],
        "constructor-super": [
            ERROR
        ],
        "generator-star-spacing": [
            ERROR,
            { before: false, after: true }
        ],
        "no-class-assign": [
            ERROR
        ],
        "no-const-assign": [
            ERROR
        ],
        "no-dupe-class-members": [
            ERROR
        ],
        "no-new-symbol": [
            ERROR
        ],
        "no-this-before-super": [
            ERROR
        ],
        "no-useless-constructor": [
            ERROR
        ],
        "no-var": [
            ERROR
        ],
        "prefer-arrow-callback": [
            ERROR
        ],
        "prefer-reflect": [
            ERROR
        ],
        "prefer-rest-params": [
            ERROR
        ],
        "prefer-spread": [
            ERROR
        ],
        "prefer-template": [
            ERROR
        ],
        "template-curly-spacing": [
            ERROR
        ],
        "yield-star-spacing": [
            ERROR
        ],

        ////////////////////////
        // http://github.com/arcanis/eslint-plugin-arca

        "arca/curly": [
            ERROR
        ],
        "arca/melted-constructs": [
            ERROR
        ],
        "arca/import-align": [
            ERROR
        ],
        "arca/import-ordering": [
            ERROR,
            [ "^styles/", "^common/", "^(fullscreen|devtool)/", "^sources/", "^settings/" ]
        ],
        "arca/newline-after-import-section": [
            ERROR,
            [ "^styles/", "^common/", "^(fullscreen|devtool)/", "^sources/", "^settings/" ]
        ],
        "arca/no-default-export": [
            ERROR
        ],

        ////////////////////////
        // IMPORT STATEMENTS

        "import/default": [
            ERROR
        ],
        "import/export": [
            ERROR
        ],
        "import/imports-first": [
            ERROR
        ],
        "import/named": [
            ERROR
        ],
        "import/no-amd": [
            ERROR
        ],
        "import/no-commonjs": [
            ERROR
        ],
        "import/no-unresolved": [
            ERROR
        ]

    }
};
