/*
 * @Author: sunpeiyuan
 * @Date: 2020-03-31 22:27:33
 * @LastEditors: sunpeiyuan
 * @LastEditTime: 2020-03-31 22:58:09
 * @FilePath: \study-ts-webpack01\build\webpack.config.js
 * @Description: 项目 启动/打包 配置文件
 */
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",

  output: {
    filename: "main.js"
  },

  resolve: {
    extensions: [".ts", ".tsx", ".js"]
  },

  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },

  devtool: process.env.NODE_DEV === "production" ? false : "inline-source-map",

  devServer: {
    contentBase: "./dist",
    stats: "errors-only",
    compress: false,
    host: "localhost",
    port: 8080
  },

  plugins: [
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ["./dist"]
    }),
    new HtmlWebpackPlugin({
      template: "./src/template/index.html"
    })
  ]
};
