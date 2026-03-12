import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import AddArticle from './components/AddArticle'
import UserDashboard from './components/UserDashboard'
import AuthorDashboard from './components/AuthorDashboard'
import AdminDashboard from './components/AdminDashboard'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,        // Header + Footer wrapped here
    children: [
      { index: true, element: <Home /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'add-article', element: <AddArticle /> },
      { path: 'user-dashboard', element: <UserDashboard /> },
      { path: 'author-dashboard', element: <AuthorDashboard /> },
      { path: 'admin-dashboard', element: <AdminDashboard /> },
    ],
  },
])

function App() {
  return <RouterProvider router={router} />
}

export default App