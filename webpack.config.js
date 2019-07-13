const path = require('path');

module.exports = {
  entry: './src/index.tsx',
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'scss'],
    alias: {
      "@app": path.resolve(__dirname, "src/app"),
      "@containers": path.resolve(__dirname, "src/app/containers"),
      "@reducers": path.resolve(__dirname, "src/app/reducers"),
      "@actions": path.resolve(__dirname, "src/app/actions"),
      "@stores": path.resolve(__dirname, "src/app/stores"),
      "@style": path.resolve(__dirname, "src/app/style"),
      "@util": path.resolve(__dirname, "src/app/util"),
      "@envs": path.resolve(__dirname, "src/app/envs"),
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
    path: path.join(__dirname, 'public/js')
  }
};
