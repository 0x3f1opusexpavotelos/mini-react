import { joinPath, flattenRoutes } from '../index.js'
import { render } from 'react-dom'
import { Navigate } from '#react-router-dom'
describe('joinPath', () => {
  test('should remove extra slashes in  path separator', () => {
    expect(joinPath(['/user', '/add'])).toBe('/user/add')
    expect(joinPath(['/user/', '/add'])).toBe('/user/add')
    expect(joinPath(['/user', 'add'])).toBe('/user/add')
  })
})

describe('flatten routes', () => {
  test('should flatten nested routes and nested first', () => {
    const routes = [
      {
        path: '/user',
        element: 'User',
        children: [
          { path: 'add', element: 'UserAdd' },
          { path: 'list', element: 'UserAdd' },
          { path: 'detail/:id', element: 'UserAdd' },
        ],
      },
    ]

    const resultRoutes = flattenRoutes(routes)

    const expectRoutes = [
      { path: '/user/add', element: 'UserAdd' },
      { path: '/user/list', element: 'UserAdd' },
      { path: '/user/detail/:id', element: 'UserAdd' },
      { path: '/user', element: 'User' },
    ]

    expect(resultRoutes).toEqual(expectRoutes)
  })
})

describe('Protected Component', () => {
  afterEach(() => {
    localStorage.clear()
    jest.clearAllMocks()
  })

  it('renders the RouteComponent when user is logged in', () => {
    localStorage.setItem('login', 'true')
    const RouteComponent = () => <div>Protected Content</div>

    render(<Protected RouteComponent={RouteComponent} from="/home" />)

    expect(screen.getByText('Protected Content')).toBeInTheDocument()
    expect(Navigate).not.toHaveBeenCalled()
  })

  it('redirects to /login when user is not logged in', () => {
    const RouteComponent = () => <div>Protected Content</div>

    render(<Protected RouteComponent={RouteComponent} from="/home" />)

    expect(Navigate).toHaveBeenCalledWith({
      to: { pathname: '/login', state: { from: '/home' } },
    })
    expect(screen.queryByText('Protected Content')).not.toBeInTheDocument()
  })
})
