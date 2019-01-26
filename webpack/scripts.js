const path = require('path');
const fs = require('fs');
const hjson = require('hjson');
const webpack = require('webpack');
const _ = require('lodash');

const genBabelConfig = DEV =>
{
	const babelrc = path.resolve(`${__dirname}/../.babelrc`);
	const cfg = hjson.parse(fs.readFileSync(babelrc) + '');

	if(DEV)
	{
		// use all modern features natively
		// for easy debugging without sourceMaps
		cfg.presets[0] =
			[
				'@babel/preset-env',
				{ targets: 'Chrome 69' }
			];

		// ignore .babelrc file
		cfg.babelrc = false;

		// inform react about filepath & linenumber in JSX-code
		cfg.plugins.push('@babel/plugin-transform-react-jsx-source');
	}

	// set it only for webpack because otherwise (in .babelrc)
	// it breaks nodejs-test enviroment
	cfg.plugins.push(
		[
			'babel-plugin-import',
			{ libraryName: 'antd', libraryDirectory: 'es', style: 'css' },
			'antd'
		]);

	return cfg;
};

const genBabelLoader = DEV => (
{
	test: /\.js$/,
	loader: 'babel-loader',
	query: genBabelConfig(DEV),
});

const genDefinePlugin = DEV =>
	new webpack.DefinePlugin(
	{
		DEV,
		'process.env':
		{
			NODE_ENV: DEV ? '"development"' : '"production"'
		},
	});

const extractNPM = cfg =>
{
	_.set(cfg, 'optimization.splitChunks.cacheGroups.vendor',
		{
			chunks: 'initial',
			name: 'vendor',
			test(module, chunks)
			{
				return module.context.includes('node_modules')
					&& !module.context.includes('ant')
					&& !module.context.includes('rc-');
			},
			enforce: true,
		});
	_.set(cfg, 'optimization.splitChunks.cacheGroups.antd',
		{
			chunks: 'all',
			name: 'antd',
			test: /@ant|antd|rc-/,
			enforce: true,
		});
};

module.exports = (DEV, dirs, cfg) =>
{
	Object.assign(cfg,
	{
		mode: DEV ? 'development' : 'production',
		context: dirs.src,
		entry: { app: './app.js' },
		output:
		{
			path: dirs.out,
			filename: `[name].js?[chunkhash]`,
		},
	});

	// move all npm-module into a separated js-file
	extractNPM(cfg);

	// DEV, process.env.NODE_ENV
	cfg.plugins.push(genDefinePlugin(DEV, cfg));

	// babel loader + babel plugin
	cfg.module.rules.push(genBabelLoader(DEV));
};