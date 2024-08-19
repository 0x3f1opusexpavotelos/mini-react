import { useNavigate, useLocation } from 'react-router-dom'

function Login() {
  const navigate = useNavigate()
  const location = useLocation()
  let to = '/'
  const login = () => {
    to = location.state.from || '/'
    navigate(to)
  }
  return <button onClick={login}></button>
}

export default Login
