import React  from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import Login from './components/Login.jsx'
import Register from './components/Register.jsx'
import About from './components/About.jsx'
import Root from './components/Root.jsx'
import Home from './Home/Home.jsx'
import AuthProvider from './components/AuthProvider.jsx'

const router = createBrowserRouter([
  {
    path : '/',
    element : <Root></Root>,
    children : [
      {
        path : '/',
        element : <Home></Home>
      },
      {
        path : '/register',
        element : <Register></Register>
      },
      {
        path : '/signin',
        element : <Login></Login>
      },
      {
        path : '/about',
        element : <About></About>
      }
    ]
  }
])
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
    <RouterProvider router={router}></RouterProvider>
    </AuthProvider>
  </React.StrictMode>,
)
