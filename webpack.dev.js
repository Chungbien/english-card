const webpack = require("webpack");
const { merge } = require("webpack-merge");
const common = require("./webpack.common");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const sass = require("sass");
const path = require("path");

// nó ghép với file webpack`webpack.common.js` đã cấu hình cơ bản để sử dụng.
module.exports = merge(common, {
  // môi trường : development
  mode: "development",

  //  nó sẽ hiển thị lỗi ở đâu (vì khi lỗi nó sẽ hiển thị ở file đã build trong folder dist
  // mà khi build là cú pháp js5 cái ta cần là chính xác lỗi chỗ nào,
  // đó là lý do bạn nên để 'inline-source-map'
  devtool: "cheap-source-map",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    hot: true,
    historyApiFallback: true,
    port: 3000
  },
  module: {
    // các file scss được loader bởi style-loader, css-loader, sass-loader
    rules: [
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          "style-loader",
          "css-loader",
          "postcss-loader",
          {
            loader: "sass-loader",
            options: { implementation: sass },
          },
        ],
      },
    ],
  },
  // watch: true,  // nó thông báo là có 1 số cái đéo thể thêm thằng này vào!
  plugins: [
    // HotModuleReplacementPlugin: nó giúp tạo ra server riêng tự động reload khi
    // có bất kỳ thay đổi nào từ các file hệ client của project/
    new webpack.HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({
      title: "Learning Webpack",
      inject: false,
      template: require("html-webpack-template"),
      meta: [
        {
          name: "description",
          content: "A better default template for html-webpack-plugin.",
        },
      ],
      mobile: true,
      lang: "en-US",
      bodyHtmlSnippet:
        '<div id="root"></div> <script src="https://unpkg.com/ionicons@5.2.3/dist/ionicons.js"></script>',
      links: [
        "https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,400;0,500;1,200&display=swap",
      ],
      scripts: [
        {
          src: "js/index.js",
          type: "text/javascript",
        },
      ],
    }),
  ],
});
