const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = (env, argv) => {
  return {
    entry: ["regenerator-runtime/runtime.js", "./src/assets/js/index.js"],
    output: {
      filename: "main.js",
      path: path.resolve(__dirname, "dist"),
    },
    devtool: argv.mode == 'production' ? false: 'inline-source-map',
    plugins: [new MiniCssExtractPlugin()],
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        },
        {
          test: /\.scss$/i,
          use: [
            MiniCssExtractPlugin.loader,
            "css-loader",
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  plugins: ["postcss-preset-env"],
                },
              },
            },
            "sass-loader",
          ],
        },
      ],
    },
  }
};
