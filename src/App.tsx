// import { useState } from 'react'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import RootLayout from './Pages/rootLayout'
// import Doct from './Components/Doctors'
import About from './Pages/About'
import Contents from './Components/Contents'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import { Login } from './Pages/Login/Login'


const router = createBrowserRouter(
  createRoutesFromElements(
    
    <Route path='/' element={<RootLayout/>}>
      <Route index element={<Contents/>}/>
      <Route path='login' element={<Login/>}/>
      <Route path='Home' element={<Home/>}/>
      <Route path='Profile' element={<Profile/>}/>
      <Route path='About' element={<About/>}/>
        <Route path='faq'/>
        <Route path='contact'/>
    </Route>

  )
)

function App() {
  return (
      <RouterProvider router={router}/>
      )
    }

export default App
