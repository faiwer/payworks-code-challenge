const genCssLoader = () => (
	{
		test: /\.css$/,
		loader: ['style-loader', 'css-loader'],
		// options: { sourceMap: true, url: false, },
	});

const genScssLoader = () =>
{
	return (
	{
		test: /\.scss$/,
		loader:
		[
			'style-loader',
			{
				loader: 'css-loader',
				options: { sourceMap: true, url: false, },
			},
			'postcss-loader',
			{
				loader: 'sass-loader',
				options: { sourceMap: true, url: false, },
			},
		]
	});
};

module.exports = (DEV, dirs, cfg) =>
{
	cfg.module.rules.push(genCssLoader(), genScssLoader());
};