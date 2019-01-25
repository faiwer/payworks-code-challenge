const path = require('path');

const DEV = process.env.NODE_ENV !== 'production';

const dirs = {};
dirs.root     = path.resolve(`${__dirname}/..`);
dirs.out      = `${dirs.root}/out`;
dirs.src      = `${dirs.root}/src`;
dirs.static   = `${dirs.src}/static`;
dirs.npm      = `${dirs.root}/node_modules`;

const PORT = 9400;
const SERVER_PORT = 9401;

const cfg = module.exports = // wireframe
{
	plugins: [],
	module: { rules: [], },
	resolve: { alias: {}, },
};

require('./scripts')(DEV, dirs, cfg);
require('./styles')(DEV, dirs, cfg);
require('./server')(DEV, dirs, cfg, PORT);
require('./static')(DEV, dirs, cfg, SERVER_PORT);