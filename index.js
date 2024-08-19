import ReactDOM from 'react-dom/client'
import { Route, Routes } from './react-router'
import { BrowserRouter } from './react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<User />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  </BrowserRouter>
)
