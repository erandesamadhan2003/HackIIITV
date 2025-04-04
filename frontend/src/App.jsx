import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Login } from './auth/Login'
import { Signup } from './auth/Signup'
import { CodeEditor } from './Pages/CodeEditor'
import { JoinRoom } from './Pages/JoinRoom'

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
  },
  {
    path: '/editor',
    element: <CodeEditor />
  },
  {
    path: '/joinroom',
    element: <JoinRoom />
  }
])
export const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
      
    </>
  )
}


