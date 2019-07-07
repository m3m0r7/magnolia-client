const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      "@app": path.resolve("./src/app"),
      "@containers": path.resolve("./src/app/containers"),
      "@reducers": path.resolve("./src/app/reducers"),
      "@actions": path.resolve("./src/app/actions"),
      "@stores": path.resolve("./src/app/stores"),
      "@style": path.resolve("./src/app/style"),
      "@util": path.resolve("./src/app/util"),
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader"
          },
          {
            loader: "sass-loader",
            options: {
              implementation: require("node-sass")
            }
          }
        ]
      }
    ]
  },
  output: {
    filename: 'bundle.js',
    path: path.join('public/js')
  }
};
