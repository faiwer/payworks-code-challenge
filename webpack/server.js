const express = require('express');
const fs = require('fs');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const handleDevServer = (cfg, contentBase, PORT) =>
{
	cfg.devServer =
	{
		contentBase,
		clientLogLevel: 'error', // clear browser console
		disableHostCheck: true, // ignore URL checking
		port: PORT,
	};

	cfg.devtool = 'source-map';

	for(const dir of cfg.devServer.contentBase)
		fs.statSync(dir); // throw if smth isn't exist
};

const staticNpm = dirs => app =>
{
	app.use('/npm/', express.static(`${dirs.npm}/`));
};

const setDevServerMiddlewares = (cfg, middlewares) =>
{
	cfg.devServer.before = app =>
	{
		for(const m of middlewares)
			m(app);
	};
};

const setApiProxy = (cfg, port) =>
{
	cfg.devServer.proxy =
	{
		'/api': { target: `http://localhost:${port}` },
	};
};

const copyStatic = (cfg, dirs) =>
{
	// clear destination
	const clear = new CleanWebpackPlugin(
		[dirs.out + '/*'],
		{
			root: dirs.root,
		});

	// copy assets into destination
	const copy = new CopyWebpackPlugin(
		[
			{
				from: 'static',
				to: dirs.out,
			},
			{
				from: `${dirs.src}/static`,
				to: dirs.out,
			},
		]);

	cfg.plugins.push(clear, copy);
};

module.exports = (DEV, dirs, cfg, PORT, SERVER_PORT) =>
{
	if(DEV)
	{
		handleDevServer(cfg, [dirs.static], PORT);
		setDevServerMiddlewares(cfg, [staticNpm(dirs)]);
		setApiProxy(cfg, SERVER_PORT);
	}
	else
	{
		copyStatic(cfg, dirs);
	}

	cfg.plugins.push(new HtmlWebpackPlugin(
		{
			template: `${dirs.src}/index.html`,
			hash: true,
		}));
};