var jsdom = require('jsdom');

var chai = require('chai');
var spies = require('chai-spies');

chai.use(spies);

global.chai = chai;
global.expect = chai.expect;

beforeEach(function () {
    global.document = jsdom.jsdom();
});
