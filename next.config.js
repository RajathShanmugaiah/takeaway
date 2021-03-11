
module.exports = {
  webpack:(config)=>{
    config.module.rules.push({
      test: /\.(png|jpe?g|gif|svg)$/i,
      loader: 'file-loader',
      options: {
        outputPath: 'images',
      }
    });
    return config;
  }
};