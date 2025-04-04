import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './components/Home'
import { Login } from './auth/Login'
import { Signup } from './auth/Signup'

const appRouter = createBrowserRouter([
  {
    path: '/',
    element: <Home />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/signup',
    element: <Signup />
  }
])
export const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
    </>
  )
}


