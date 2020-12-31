# Dynamic HtmlWebpackPlugin
A webpack plugin that reads all the `.html` files in a directory and adds an HtmlWebpackPlugin for each one of them automatically.

This removes the need to manually add an HtmlWebpackPlugin for each `.html` file used for the project, which makes development and code maintenance easier.

## Installation
```
npm i -D dynamic-html-webpack-plugin
```

## Usage

### Example

#### Webpack Config
```js
module.exports = {
  entry: {
    foo: "src/scripts/foo.js",
    bar: "src/scripts/bar.js",
    utils: "src/scripts/utils.js",
    utils2: "src/scripts/utils2.js",
    common: "src/scripts/common.js"
  },
  plugins: [
    new DynamicHtmlWebpackPlugin({
      dir: "src/pages",
      additionalChunks: {
        all: "common",
        foo: ["utils", "utils2"],
        bar: "utils"
      },
      commonOptions: {
        scriptLoading: "defer",
        cache: false
      }
    })
  ]
};
```
#### File Tree
```
src/
 ├── pages/
 │    ├── foo.html
 │    └── bar.html
 └── scripts/
      ├── foo.js
      ├── bar.js
      ├── common.js
      ├── utils.js
      └── utils2.js
webpack.config.js
```
##### When Compiled
- `foo.html` will reference **foo.js**, **common.js**, **utils.js** and **utils2.js**
- `bar.html` will reference **bar.js**, **common.js** and **utils.js**

### Options

| Name                   | Type                                  | Default     | Description                                                                       |
|------------------------|---------------------------------------|-------------|-----------------------------------------------------------------------------------|
| `dir`                  | `{String}`                            | `""`        | Directory where the `.html` files are located                                     |
| `additionalChunks`     | `{Object.<String, String\|String[]>}` | `{}`        | Chunks each `.html` page will have, in addition to the one sharing its file name. |
| `additionalChunks.all` | `{String\|String[]}`                  | `undefined` | Chunks **all** pages will share and reference.                                    |
| `commonOptions`        | `{Object}`                            | `{}`        | Other **HtmlWebpackPLugin** options that will be applied to all pages.            |