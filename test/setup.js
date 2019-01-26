require('jsdom-global/register');
require('@babel/polyfill');
require('source-map-support/register');
require('@babel/register');
const React = require('react');
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// webpack global variables:
global.DEV = window.DEV = false;
global.TEST = window.TEST = true;

// enzyme doesn't know about React.memo yet :(
React.memo = v => v;

// fix scss imports without webpack
require.extensions['.scss'] = () => {};
require.extensions['.css'] = () => {};

Enzyme.configure({ adapter: new Adapter() });