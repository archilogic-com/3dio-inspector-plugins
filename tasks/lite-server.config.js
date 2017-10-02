// https://github.com/johnpapa/lite-server
// https://browsersync.io/docs/options/
module.exports = {
  port: 8081,
  startPath: '/examples/',
  files: [{
    match: ['index.html', 'examples/**'],
    watchEvents: ['change']
  }, {
    match: ['build/**'],
    watchEvents: ['add']
  }],
  serveStatic: ['./'], // uses index.html in directories
  server: {
    directory: true,
    // this is required to get directory listings (?bug?)
    middleware: { 1: null }
  },
  scrollRestoreTechnique: 'cookie'
}