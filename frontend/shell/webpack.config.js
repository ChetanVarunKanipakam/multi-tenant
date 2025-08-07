const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true
  },
  output: {
    publicPath: "auto"
  },
  resolve: {
    extensions: [".js", ".jsx"]
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "supportticketsapp",
      filename: "remoteEntry.js",
      remotes: {
        SupportTicketsApp: "SupportTicketsApp@http://localhost:3002/remoteEntry.js",
      },
      shared: {
        react: { singleton: true,  eager: false,requiredVersion: deps.react },
        "react-dom": { singleton: true, eager: false, requiredVersion: deps["react-dom"] }
      }
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" })
  ]
};
