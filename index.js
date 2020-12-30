const fs = require("fs");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");

/**
 * Reads all the html files in a given directory and adds an HtmlWebpackPlugin for each one of them.
 */
class DynamicHtmlWebpackPlugin {
	/**
	 * @param {{}} options - Config object
	 * @param {String} options.dir - Directory where the html files are located.
	 * @param {{}} additionalChunks - Entry chunks that will be added to the compiled html
	 * file (chunk with the name of the template is included by default).
	 * @param {String|String[]} aditionalChunks.all - Chunks shared between all html files
	 * @param {{}} - Other HtmlWebpackPlugin options that wil be shared between all html files
	 */
	constructor(options) {
		this.dir = options.dir || "";
		this.additionalChunks = options.additionalChunks || {};
		this.commonOptions = options.commonOptions || {};
	}

	apply(compiler) {
		this.index = compiler.options.plugins.indexOf(this);

		const files = fs.readdirSync(this.dir).filter((file) => { return file.match(/\.html$/); });

		for (const file of files) {
			const fileName = file.replace(".html", "");
			let chunks = [];

			if (compiler.options.entry[fileName]) chunks.push(fileName);
			if (this.additionalChunks[fileName]) chunks = chunks.concat(this.additionalChunks[fileName]);
			if (this.additionalChunks.all) chunks = chunks.concat(this.additionalChunks.all);

			const optionsForFile = {
				filename: file,
				template: path.join(this.dir, file),
				chunks: chunks
			};

			// After this plugin so it can load
			compiler.options.plugins.splice(this.index + 1, 0,
				new HtmlWebpackPlugin({...this.commonOptions, ...optionsForFile}));
		}
	}
}

module.exports = DynamicHtmlWebpackPlugin;