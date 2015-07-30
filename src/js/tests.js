// polyfill required for phantomjs
require('core-js/es5');
// require all tests
var context = require.context('.', true, /.+\.tests\.jsx?$/);
context.keys().forEach(context);
module.exports = context;