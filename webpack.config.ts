import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
// import "webpack-dev-server";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { EsbuildPlugin } from "esbuild-loader";
import TerserPlugin from "terser-webpack-plugin";
import StylelintPlugin from "stylelint-webpack-plugin";
import ESLintWebpackPlugin from "eslint-webpack-plugin";
import { VueLoaderPlugin } from "vue-loader";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";

const isPro = process.env.NODE_ENV === "production";

export default {
  mode: process.env.NODE_ENV,
  devtool: isPro ? "hidden-source-map" : "source-map",
  // watch: true,
  entry: {
    // 将runtime单独打包
    // main: { import: "./src/index.js", runtime: "runtime" },
    main: "./src/index.ts",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    // filename: "[name].[contenthash].js",
    filename: "assets/js/[name].[contenthash].js",
    assetModuleFilename: "assets/resource/[name].[contenthash][ext][query]",
    // publicPath: isPro ? "./" : "/",
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          // "style-loader", // 不能和cssextra插件同时使用
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              // modules: true,
              // sourceMap: true,
            },
          },
          // 利用esbuild-loader的压缩功能
          // {
          //   loader: "esbuild-loader",
          //   options: {
          //     minify: true,
          //   },
          // },
          "postcss-loader",
        ],
        include: [path.resolve(__dirname, "src")],
      },
      { test: /\.less$/, use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "less-loader"] },
      { test: /\.scss$/, use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"] },

      // babel-loader通过@babel/preset-env能支持动态导入polyfill
      // {
      //   test: /\.js$/,
      //   exclude: /node_modules/,
      //   use: [
      //     {
      //       loader: "babel-loader",
      //       options: {},
      //     },
      //   ],
      // },

      // ts-loader和 esbuild-loader只支持语法转义 默认不导入polyfill
      // { test: /\.ts$/, use: ["ts-loader"] },
      // { test: /\.ts$/, use: ["babel-loader", "ts-loader"] },

      // esbuild-loader默认不会进行类型检查 如有需要可额外引入fork-ts-checker-webpack-plugin
      // {
      //   test: /\.[jt]sx?$/,
      //   use: [
      //     {
      //       loader: "esbuild-loader",
      //       options: {
      //         target: "es2015",
      //       },
      //     },
      //   ],
      //   include: [path.resolve(__dirname, "src")],
      // },

      // esbuild-loader拆分js和ts写是为了vue-loader能识别
      {
        test: /\.js?$/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "js",
              target: "es2015",
            },
          },
        ],
        // 确保能对node_modules的vue文件进行处理
        exclude: (file) => {
          return /node_modules/.test(file) && !/\.vue\.js/.test(file);
        },
      },
      {
        test: /\.ts?$/,
        use: [
          {
            loader: "esbuild-loader",
            options: {
              loader: "ts",
              target: "es2015",
            },
          },
        ],
        // 确保能对node_modules的vue文件进行处理
        exclude: (file) => {
          return /node_modules/.test(file) && !/\.vue\.ts/.test(file);
        },
      },

      {
        test: /\.vue$/,
        loader: "vue-loader",
      },

      // webpack5通过资源模块内置了file-loader和url-loader raw-loader
      // {
      //   test: /\.(gif|png|jpe?g|svg|webp|eot|woff|ttf|pdf)$/,
      //   loader: "file-loader",
      //   options: {
      //     name: '[name].[ext]'
      //   },
      //   type: "javascript/auto", // 避免和资源模块冲突
      // },
      // {
      //   test: /.png$/i,
      //   // type: "asset/inline",
      //   type: "asset/resource",
      // },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "webpack生成的html",
      template: "./index.html",
    }),
    new MiniCssExtractPlugin({
      // filename: "assets/css/[name].[contenthash].css",
      filename: "assets/css/[name].css",
    }),
    new StylelintPlugin({
      configFile: ".stylelintrc",
      context: "src",
      extensions: ["css", "less", "scss", "vue"],
      fix: true, // 配置是否自动格式化代码
    }),
    new ESLintWebpackPlugin({
      extensions: ["js", "ts", "vue"],
      // fix: true, // 自动修复
    }),
    new ForkTsCheckerWebpackPlugin(),
    new EsbuildPlugin({
      define: {
        "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      vue: "vue/dist/vue.runtime.esm-browser.js",
    },
    extensions: [".ts", ".js", ".jsx", ".tsx", ".json"],

    // 从pkg.json中获取入口文件
    // mainFields: ["browser", "module", "main"],

    // 配置默认模块查找路径
    // modules: ["node_modules", path.resolve(__dirname, "src/modules")],
  },
  optimization: {
    minimize: true, // 配置source map这个必备
    minimizer: [
      new TerserPlugin({
        extractComments: !isPro,
      }),
      new CssMinimizerPlugin(),
    ],
  },
  devServer: {
    hot: true,
    host: "127.0.0.1",
    port: 9090,
  },

  performance: {
    // 提示类型
    hints: isPro ? "error" : false,
    // 生成文件的最大体积 设置为1M
    maxAssetSize: isPro ? 1000000 : undefined,
    // 入口文件最大体积 250kb
    maxEntrypointSize: isPro ? 250000 : undefined,
  },
} as webpack.Configuration;
