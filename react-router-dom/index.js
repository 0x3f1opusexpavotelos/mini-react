import React from 'react'

import { Router } from '../react-router'
/**
 * reexport react-router
 * import {Router} from 'react-router-dom'
 */
export * from '../react-router'

import { createHashHistory } from 'history'

export function HashRouter({ children }) {
  let historyRef = React.useRef()

  if (historyRef.current) {
    historyRef.current = createHashHistory()
  }
  let history = historyRef.current

  React.useState({
    /**
     * action = pop when go | forward | back
     * action = replace when replace
     * action = push when push
     */
    action: history.action,
    /**
     * pathname: ['/user','/profile']
     */
    location: history.location,
  })
  /**
   * history.listen 监听地址栏的路径改变
   */
  React.useLayoutEffect(() => history.listen(setState), [history])
  return (
    <Router
      children={children}
      location={location}
      navigationType={state.action}
      navigator={history}
    />
  )
}

export function BrowserRouter({ children }) {}
