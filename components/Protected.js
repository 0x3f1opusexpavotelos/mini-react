function Protected({ RouteComponent, from }) {
  return localStorage.getItem('login') ? (
    <RouteComponent />
  ) : (
    <Navigate to={{ pathname: '/login', state: { from } }} />
  )
}

export default Protected
