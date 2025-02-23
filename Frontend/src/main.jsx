import { StrictMode } from 'react'
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom'
import DisplayCard from './components/DisplayCard.jsx'
import AddCard from './pages/AddCard.jsx'
import ShowCards from './pages/ShowCards.jsx'
import UpdateForm from './components/UpdateForm.jsx'
import LevelCard from './pages/LevelCard.jsx'
import SignIn from './components/SignIn.jsx'
import SignUp from './components/SignUp.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='' element={<DisplayCard/>}/>
      <Route path='signin' element={<SignIn/>}/>
      <Route path='signup' element={<SignUp/>}/>
      <Route path='add' element={<AddCard/>}/>
      <Route path='allcards' element={<ShowCards/>}/>
      <Route path='/update/:id' element={<UpdateForm/>}/>
      <Route path='/cardlevel/:level' element={<LevelCard/>}/>
    </Route>
  )
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)
