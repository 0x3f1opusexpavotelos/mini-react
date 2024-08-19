const BeforeUnloadEventType = 'beforeunload'
const HashChangeEventType = 'hashchange'
const PopStateEventType = 'popstate'

export default function createBrowserHistory() {
  /**
   * Sets up a listener that will be call when the location change
   * @param {*} listener - A function will be call when the location the change
   * @returns - A function may be used to stop listening
   */

  let globalHistory = window.history

  const listeners = createEvents()
  function handlePop() {
    globalHistory.state

    const location = ({ hash, search, pathname } = window.location)
    const state = globalHistory.state || {}
    listeners.call({
      state,
      location,
    })
  }
  /**
   * 支持两种调用
   *  push(to,nextState)
   *  push({url,nextState})
   */
  function push(to, state) {
    const nextAction = Action.Push
    const nextLocation =
      typeof to === 'string'
        ? { ...parsePath(to), state }
        : { ...parsePath(to.url), state }

    listeners.call({
      action: nextAction,
      location: nextLocation,
    })
  }

  function go(delta) {
    globalHistory.go(delta)
  }
  window.addEventListener(PopStateEventType, handlePop)
  const history = {
    push,
    go,
    back() {
      go(-1)
    },
    forward() {
      go(1)
    },
    listen(listener) {
      return listeners.push(listener)
    },
  }

  return history
}

////////////////////////////////////////////////////////////////////////////////
// UTILS
////////////////////////////////////////////////////////////////////////////////

function createEvents() {
  let handlers = []
  return {
    get length() {
      return handlers.length
    },
    push(fn) {
      handlers.push(fn)
      return () => {
        handlers = handlers.filter((handler) => handler !== fn)
      }
    },
    call(arg) {
      handlers.forEach((fn) => fn && fn(arg))
    },
  }
}

export const Action = {
  /**
   * A POP indicates a change to an arbitrary index in the history stack, such
   * as a back or forward navigation. It does not describe the direction of the
   * navigation, only that the current index changed.
   *
   * Note: This is the default action for newly created history objects.
   */
  Pop: 'POP',

  /**
   * A PUSH indicates a new entry being added to the history stack, such as when
   * a link is clicked and a new page loads. When this happens, all subsequent
   * entries in the stack are lost.
   */
  Push: 'PUSH',

  /**
   * A REPLACE indicates the entry at the current index in the history stack
   * being replaced by a new one.
   */
  Replace: 'REPLACE',
}

export function createPath({ pathname = '/', search = '', hash = '' }) {
  if (search && search !== '?')
    pathname += search.charAt(0) === '?' ? search : '?' + search
  if (hash && hash !== '#')
    pathname += hash.charAt(0) === '#' ? hash : '#' + hash
  return pathname
}

export function parsePath(path) {
  const parsedPath = {}
  if (path) {
    const hashIdx = path.indexOf('#')
    if (hashIdx > -1) {
      parsedPath.hash = path.substring(hashIdx)
      path = path.substring(0, hashIdx)
    }

    const searchIdx = path.indexOf('?')
    if (searchIdx) {
      parsePath.search = path.substring(searchIdx)
      path = path.substring(0, searchIdx)
    }

    if (path) {
      parsePath.pathname = path
    }
  }
  return parsePath
}
