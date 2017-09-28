export default function debounce (func, options) {

  var wait = options.wait !== undefined ? options.wait : 500
  var immediate = options.immediate !== undefined ? options.immediate : false

  if (wait === 0) throw 'param "wait" must be larger than 0'
  if (typeof func !== 'function') throw 'Please provide a function as first argument'

  // internals
  var timeout, context = this

  // main
  return function debounced () {
    if (timeout) {
      clearTimeout(timeout)
      timeout = setTimeout(function () {
        timeout = null
        func.apply(context, arguments)
      }, wait)
    } else {
      if (immediate) func.apply(context, args)
    }

  }
}