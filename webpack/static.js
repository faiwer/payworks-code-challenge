const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const handleStatic = (cfg, staticDir, outDir) =>
{
	// clear destination
	const clear = new CleanWebpackPlugin(
		[`${outDir}/*`],
		{ allowExternal: true });

	// copy assets into destination
	const copy = new CopyWebpackPlugin([{ from: staticDir, to: outDir }]);

	cfg.plugins.push(clear, copy);
};

module.exports = (DEV, dirs, cfg) =>
{
	if(!DEV)
		return;

	handleStatic(cfg, dirs.static, dirs.out);
};