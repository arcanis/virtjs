#!/usr/bin/env bash

$(npm bin)/webpack --config webpack.config-node.js
$(npm bin)/webpack --config webpack.config-web.js
