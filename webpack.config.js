const webpack = require("webpack");
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const { modifyVars } = require("./src/styles/antModifyVars");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = (env = {}, options) => {
  const { mode = "development" } = options;

  const isProd = mode === "production";
  const isDev = mode === "development";
  //const target = mode === "development" ? "web" : "browserslist"

  console.log("NODE JS VERSION", process.version);

  const getStyleLoaders = () => {
    return [
      isProd ? MiniCssExtractPlugin.loader : "style-loader",
      "css-loader",
    ];
  };

  const getPlugins = () => {
    const plugins = [
      new CopyWebpackPlugin([
        { from: 'public' }
      ]),
      new HtmlWebpackPlugin({
        template: "public/index.html",
        //favicon: "src/assets/images/favicon.png",
        buildTime: new Date().toString().slice(0, 24),
        metrika: isProd
      }),
    ];

    if (isProd) {
      plugins.push(
        new MiniCssExtractPlugin({
          filename: "main.[hash:8].css",
        }),
        new CleanWebpackPlugin()
      );
    } else {
      plugins.push(
        new webpack.SourceMapDevToolPlugin({
          filename: "[file].map",
        })
      );
      plugins.push(
        new webpack.HotModuleReplacementPlugin()
      );
      plugins.push(
        new ReactRefreshWebpackPlugin()
      );
    }

    return plugins;
  };

  return {
    mode: isProd ? "production" : isDev && "development",

    entry: path.resolve(__dirname, "src/index.tsx"),

    output: {
      path: path.resolve(__dirname, "./dist"),
      filename: isProd ? "main-[hash:8].js" : undefined, // название файла. undefined - название по умолчанию
      publicPath: "/",
    },

    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          loader: "babel-loader",
        },
        {
          test: /\.(ts|tsx)$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        // loading images
        {
          test: /\.(jpg|png|gif|ico|jpeg|svg)$/,
          use: [
            {
              loader: "file-loader",
              options: {
                outputPath: "images",
                name: "[name]-[sha1:hash:7].[ext]",
              },
            },
          ],
        },
        {
          test: /\.(woff|woff2|eot|ttf|otf)$/i,
          type: 'asset/resource',
        },

        // loading css
        {
          test: /\.(css)$/,
          exclude: /node_modules/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
                sourceMap: true,
              },
            },
          ],
        },

        // loading SASS/SCSS
        {
          test: /\.(s[ca]ss)$/,
          exclude: /node_modules/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
                sourceMap: true,
              },
            },
            "sass-loader",
          ],
        },

        // loading LESS
        {
          test: /\.less$/,
          use: [
            ...getStyleLoaders(),
            {
              loader: "postcss-loader",
              options: {
                postcssOptions: {
                  config: path.resolve(__dirname, 'postcss.config.js'),
                },
                sourceMap: true,
              },
            },
            {
              loader: "less-loader",
              options: {
                lessOptions: {
                  modifyVars: modifyVars,
                  javascriptEnabled: true,
                },
              },
            },
          ],
        },
      ],
    },

    resolve: {
      plugins: [new TsconfigPathsPlugin()],
      alias: {
        "#src": path.resolve(__dirname, "src"),

        "#businessLogic": path.resolve(__dirname, "../src/businessLogic/"),
        "#types": path.resolve(__dirname, "../src/types/"),
        "#core": path.resolve(__dirname, "src/core/"),
        "#constructors": path.resolve(__dirname, "src/constructors/"),
        "#styles": path.resolve(__dirname, "src/styles/"),

        "#stores": path.resolve(__dirname, "src/app/stores"),
        "#pickers": path.resolve(__dirname, "src/app/pickers/"),
        "#ui": path.resolve(__dirname, "src/app/ui/"),
        "#components": path.resolve(__dirname, "src/app/components/"),
        "#utils": path.resolve(__dirname, "src/app/utils/"),
        "#hooks": path.resolve(__dirname, "src/app/hooks/"),
        "#constants": path.resolve(__dirname, "src/app/constants/"),

        "#images": path.resolve(__dirname, "src/assets/images"),
        "#svgIcons": path.resolve(__dirname, "src/assets/svg/"),
      },
      extensions: [".js", ".jsx", ".ts", ".tsx", ".svg", "scss", "sass"],
    },

    plugins: getPlugins(),

    devtool: isProd ? false: "eval-cheap-module-source-map",
    //target: target,
    devServer: {
      open: true,
      port: 8058,
      hot: true,
      historyApiFallback: true,
      proxy: {
        "/api": {
          target: "http://localhost:5000",
          secure: false,
          changeOrigin: true,
        },
      },
    },
  };
};