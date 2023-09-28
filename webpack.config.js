const HtmlWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const deps = require('./package.json').dependencies;
module.exports = {
	mode: 'development',
	devServer: {
		port: 4005,
	},
	module: {
		rules: [
			{
				test: /\.js?$/,
				exclude: /node_modules/,
				loader: 'babel-loader',
				options: {
					presets: ['@babel/preset-env', '@babel/preset-react'],
				},
			},
			{
				test: /\.css|scss$/i,
				use: ['style-loader', 'css-loader', 'sass-loader'],
			},
		],
	},
	plugins: [
		new ModuleFederationPlugin({
			name: 'PROVIDER',
			filename: 'remoteEntry.js',
			exposes: {
				'./App': './src/App',
				'./Grid': './src/components/Grid',
				'./AUM': './src/components/AUM',
			},
			shared: [
				{
					...deps,
					react: { requiredVersion: deps.react, singleton: true },
					'react-dom': {
						requiredVersion: deps['react-dom'],
						singleton: true,
					},
				},
			],
		}),
		new HtmlWebpackPlugin({
			template: './public/index.html',
		}),
	],
};
