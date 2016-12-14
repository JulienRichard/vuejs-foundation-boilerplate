module.exports = {
  siteName: 'VueJs + Foundation Boilerplate',
  entry: {
    app: './src/app.js'
  },
  browsers: ['last 2 versions', 'ie > 8'],
  output_path: 'www/',
  browserSync: true,
  browserSyncPort: 3000,
  html: true
}
