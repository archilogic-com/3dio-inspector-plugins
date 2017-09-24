import json from 'rollup-plugin-json'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'
import less from 'rollup-plugin-less'
const preamble = require('./preamble.js')

// wraps SVG file into modules
function svg () {
  return {
    transform(code, id) {
      if (/\.svg$/.test(id) === false) return
			// remove comments and fix new line chars
      code = code.replace(/\n{2,}/g, '\n') // # \n+ to \n
			// add module wrapper
			code = 'export default ' + JSON.stringify(code) + ';'
      return {
        code: code,
        map: {mappings: ''}
      }
    }
  }
}

// https://rollupjs.org/#javascript-api
export default {
  entry: 'src/index.js',
  indent: '\t',
  sourceMap: true,
  plugins: [
    json(),
    svg(),
    less({
      include: [ '**/*.less', '**/*.css' ],
      insert: false, // true does insert css to head automatically
      output: function(css) { return css; } // avoids css file being created
    }),
    commonjs(),
    resolve()
  ],
  targets: [
    {
      format: 'umd',
      banner: preamble.text,
      intro: `var BUILD_DATE='${preamble.date}', GIT_BRANCH = '${preamble.gitBranchName}', GIT_COMMIT = '${preamble.gitCommitSha1}'`,
      moduleName: 'io3dInspectorPlugins', // and global object name in browser environment
      globals: {
        THREE: 'THREE'
      },
      dest: 'build/3dio-inspector-plugins.js'
    }
  ],
  onwarn (warning) {
    // skip eval warnings (bluebird module uses eval)
    if (warning.code === 'EVAL') return
    // log everything else
    console.warn(warning.message)
  }
}
