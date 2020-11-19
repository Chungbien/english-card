const path = require("path");
const sass = require("sass");

module.exports = {
  entry: ["./src/index.js", "./src/common/sass/index.scss"],
  output: {
    filename: "js/index.js",
    path: path.resolve(__dirname, "/dist"),
    publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        loader: "babel-loader",
        exclude: [/node_modules/],
      },
      {
        test: /\.(jpe?g|png|gif|svg|woff2?|ttf|eot)$/i,
        loader: "file-loader",
        options: {
          digest: "hex",
          hash: "sha512",
          name: "content/[hash].[ext]",
        },
      },
    ],
  },
};
