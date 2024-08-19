import React from 'react'

/**
 *
 * @param children
 * @param location
 * @param navigator 导航对象
 */
export function Router({ children, location, navigator }) {}
export function Routes(children) {
  const routes = createRoutesFromChildren(children)
  return useRoutes(routes)
}

export function Route() {}

function useLocation() {
  return React.useContext(locationContext).location
}

/**
 * 根据路由配置数组渲染对应的组件
 * @param {*} routes
 */

function useRoutes(routes) {
  const location = useLocation()
  const pathname = location.pathname || ''
  for (i = 0; i < routes.length; i++) {
    // 解构出每个路由规则中路径和渲染元素
    const { path, element } = routes[i]
    const match = matchPath(path, pathname)
    if (match) {
      return element
    }
  }
  return null
}
/**
 * 匹配路由规则中的路径和地址栏中的路径名
 */

function matchPath(path, pathname) {
  const regexSource = '^' + path + '$'
  const matcher = new Regex(regexSource)
  const match = pathname.match(matcher)
  return match.length > 0
}

/**
 *
 * @param {*} children
 * 创建路由配置数组
 */
function createRoutesFromChildren(children) {
  const routes = []
  React.Children.forEach(children, (elem) => {
    routes.push({
      path: elem.props.path,
      element: elem.props.element,
    })
  })
  return routes
}

export function flattenRoutes(routes, parentPath = '', branches = []) {
  routes.forEach((route) => {
    const path = joinPath([parentPath, route.path])
    if (route.children && route.children.length > 0) {
      flattenRoutes(route.children, path, branches)
    }
    branches.push({
      path,
      element: route.element,
    })
  })
  return branches
}

export function joinPath(paths) {
  return paths.join('/').replace(/\/\/\/?/g, '/')
}
