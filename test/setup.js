require('jsdom-global/register');
require('@babel/polyfill');
require('source-map-support/register');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// webpack global variables:
global.DEV = window.DEV = false;
global.TEST = window.TEST = true;

// fix scss imports without webpack
require.extensions['.scss'] = () => {};

Enzyme.configure({ adapter: new Adapter() });