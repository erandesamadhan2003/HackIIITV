import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './App.css'
import { Home } from './Pages/Home'
import { Login } from './auth/Login'
import { Signup } from './auth/Signup'
import { CodeEditor } from './Pages/CodeEditor'
import { JoinRoom } from './Pages/JoinRoom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";
import MentorForm from './Pages/MentorForm'
import MenteeForm from './Pages/MenteeForm'
import CollabForm from './Pages/CollabForm'
import AllMentors from './Pages/mentor'

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
  },
  {
    path: '/mentorform',
    element: < MentorForm/>
  },
  {
    path: '/menteeform',
    element: <MenteeForm/>
  },
  {
    path: '/collabform',
    element: <CollabForm/>
  },
  {
    path: '/mentors',
    element: <AllMentors/>
  }
])
export const App = () => {
  return (
    <>
      <RouterProvider router={appRouter} />
      <ToastContainer 
        position="bottom-right" 
        autoClose={3000} 
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


