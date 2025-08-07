const HtmlWebpackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;

module.exports = {
  entry: "./src/index.js", // Make sure index.js exists and renders <App />
  mode: "development",
  devServer: {
    port: 3002,
    historyApiFallback: true,
    hot: true,
    headers: {
        "Access-Control-Allow-Origin": "*"
    }
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
      name: "SupportTicketsApp",
      filename: "remoteEntry.js",
      exposes: {
        "./App": "./src/App.jsx"
      },
      shared: {
        react: { singleton: true, eager: false, requiredVersion: deps.react },
        "react-dom": { singleton: true, eager: false, requiredVersion: deps["react-dom"] }
      }
    }),
    new HtmlWebpackPlugin({ template: "./public/index.html" })
  ]
};
