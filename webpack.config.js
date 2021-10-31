var path = require('path');

module.exports = {
	mode: 'production',
	entry: './src/main.ts',
	output: {
		filename: 'build.js',
		path: path.resolve(__dirname, 'dist')
	},
	resolve: {
		extensions: [".ts", ".tsx", ".jsx", ".js"]
	},
	module: {
		rules: [{
			test: /\.ts$/,
			loader: 'ts-loader',
			exclude: /node_modules/
		}]
	}
}
