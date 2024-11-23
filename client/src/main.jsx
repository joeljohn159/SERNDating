import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.jsx'
import './index.css'
import Landing from './pages/Landing.jsx'
import NotFound from './pages/NotFound.jsx'
import Login from './pages/Login.jsx'
import SignUp from './pages/SignUp.jsx'
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS
import SwipePage from './pages/Swipe.jsx'
import { AuthProvider } from './context/AuthContext.jsx'
import ProtectedRoute from './utilities/ProtectedRoute.jsx'
import { ToastContainer } from 'react-toastify'
import Profile from './pages/Profile.jsx'




const router = createBrowserRouter([
  {path:'/', element:<Landing/>, errorElement:<NotFound/>},
  {path:'/login', element:<Login/>},
  {path:'/signup', element:<SignUp/>},
  {path:'/swipe', element:<ProtectedRoute element={<SwipePage/>} /> },
  {path:'/profile', element:<ProtectedRoute element = {<Profile/>} />}
  
])

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer/>
    </AuthProvider>
  </StrictMode>
);
