/**
 * If you want to execute a function LATER
 * but want to set its arguments NOW...
 * Let the curry simmer in the slow cooker until you're ready to eat it. :)
 * Useful with Promise.all or lists of values each of which you'd like to run through a function.
 * ```
 *    let toDoLater = __.call_later(console.warn, 'go for a run')
 *    // or
 *    __.for_each_promise_all([1000,2000,3000], __.call_later(__.sleep, 1000))
 * ```
 * @param {function} func - function you want to call later (to curry). It can be bound
 * @param {array} args - array of arguments (optional, but no need to use this without arguments)
 */
export function call_later(func, args){
  return function(){
    return func(args)
  }
}

/**
 * Compose unlimited number of functions.
 * One calls the original argument.
 * The output of that becomes the argument for the next function. Repeatedly.
 * NOTE: right now each function works with only 1 argument
 * ```
 *    var f = (x) => x + 5;
 *    var g = (x) => x + 7;
 *    var h = (x) => x + 10;
 *    var fgh = compose(f, g, h);
 *    console.log(fgh(5)) // 27
 * ```
 * @param first {function} - function to call first
 * @param funcs {function} - keep adding arguments (functions)
 * @returns {function(*=): *}
 */
export function compose(first, ...funcs) {
  return function(x){
    return funcs.reduce(function(accumulator, func){
      return func(accumulator)
    },first(x))
  }
}


/**
 * Export to browser window
 */
import exports from '.' // this is lazy, and temporary - will later rewrite object of exports manually
if (typeof window === 'object') {
  // set up for export
  window.__ = window.__||{}
  // flatten
  for (let func in exports) {
    window.__[func] = exports[func]
  }
  // alternatively, maybe export to namespace?
  // window.ppf['arrays'] = exports// flatten
}
