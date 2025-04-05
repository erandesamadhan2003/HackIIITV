import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Login } from './auth/Login'
import { Signup } from './auth/Signup'
import { CodeEditor } from './Pages/CodeEditor'
import { JoinRoom } from './Pages/JoinRoom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

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
    path: '/editor/:roomId',
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
      <ToastContainer 
        position="bottom-right" 
        autoClose={500} 
        hideProgressBar={false} 
        newestOnTop 
        closeOnClick 
        pauseOnHover 
        draggable 
        theme="colored" 
      />
    </>
  )
}


