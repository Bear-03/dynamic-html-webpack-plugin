const path = require("path");
const DynamicHtmlWebpackPlugin = require(".");

module.exports = (_, options) => {
	const devmode = options.mode === "development";
	return {
		// Entries for specific html files must be named as the html file.
		entry: {
			index: "scripts/index.js",
			about: "scripts/about.js",
			common: "scripts/common.js"
		},
		output: {
			path: path.resolve(__dirname, "test/dist"),
			filename: "scripts/[name].bundle.js"
		},
		resolve: {
			alias: {
				src: path.resolve(__dirname, "test/src"),
				scripts: path.resolve(__dirname, "test/src/scripts")
			}
		},
		module: {
			rules: [
				{
					test: /\.html$/,
					loader: "html-loader"
				}
			]
		},
		plugins: [
			new DynamicHtmlWebpackPlugin({
				dir: "test/src/pages",
				additionalChunks: {
					all: "common",
					index: ["about"]
				},
				commonOptions: {
					scriptLoading: "defer",
					cache: false
				}
			})
		],
		optimization: {
			minimize: !devmode,
		}
	};
};