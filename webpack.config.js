module.exports = {
  module: {
    rules: [
      {
        test: /resources\/js\/.*\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ]
      },
      {
        test: /\.yml$/,
        use: [{ loader: 'json-loader' }, { loader: 'yaml-flat-loader' }]
      }
    ]
  }
};
