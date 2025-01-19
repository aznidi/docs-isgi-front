import { useState } from 'react'
import './App.css'
import './index.css';
import { RouterProvider } from 'react-router-dom'
import { router } from './router'
import { AuthProvider } from "./context/AuthContext.jsx";


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
        <AuthProvider>
            <RouterProvider router={router} />
        </AuthProvider>
    </>
  )
}

export default App
