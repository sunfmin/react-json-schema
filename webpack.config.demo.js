module.exports = {
	entry: {
		bundle: "./demo/index.jsx",
		index: "./demo/index.html"
	},
	output: {
		filename: "[name].[ext]",
		path: __dirname+ '/build'
	},
	mode: "production",
	module: {
		rules: [
			{
				test: /\.js|jsx$/,
				exclude: /node_modules/,
				loader: "babel-loader",
				query: {
					presets: ["react", "es2015"],
					plugins: [
						"transform-es2015-destructuring",
						"transform-object-rest-spread"
					]
				}
			},
			{
				test: /\.html$/,
				loader: "file-loader?name=[name].[ext]"
			}
		]
	},
	externals: {
		React: "react",
		ReactBootstrap: "react-bootstrap"
	},
	resolve: {
		extensions: [".js", ".jsx"]
	}
};
