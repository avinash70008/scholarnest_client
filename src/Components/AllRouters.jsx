import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { EditProfile } from './EditProfile'
import { RegistrationForm } from './RegistrationForm'
import  { LoginForm } from './LoginForm'
import { Dashboard } from './Dashboard'



export const AllRouters = () => {
  return (
   <Routes>
    <Route path='/registration' element = {<RegistrationForm />} />
    <Route path='/editprofile' element={<EditProfile />} />
    <Route path='/' element={<LoginForm />} />
    <Route path='/dashboard' element={<Dashboard />} />
   </Routes>
  )
}

