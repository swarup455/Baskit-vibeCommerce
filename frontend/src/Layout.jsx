import React, { useEffect, useState } from 'react'
import { Routes, Route } from "react-router-dom"
import Header from './components/Header/Header'
import Sidebar from './components/Sidebar/Sidebar'
import Homepage from './pages/Homepage/Homepage'
import Cartpage from './pages/Cartpage/Cartpage'
import Loginpage from './pages/Loginpage/Loginpage'
import { ToastContainer } from "react-toastify"
import { useSelector } from "react-redux"
import { Navigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { getUser } from './reduxToolkit/auth/authSlice'
import { getMock } from './reduxToolkit/product/productSlice'
import { getCart } from './reduxToolkit/product/productSlice'

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState();
  const { authUser } = useSelector((state) => state.auth);
  const dispatch = useDispatch()

  useEffect(() => {
    if (!authUser) {
      dispatch(getUser())
    }
  }, [dispatch])

  useEffect(() => {
    dispatch(getMock());
  }, [dispatch])

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch])

  return (
    <div>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
      />
      {authUser &&
        <Header onOpen={() => setSidebarOpen(true)} onLogoutOpen={() => setLogoutOpen(true)} logoutClose={() => setLogoutOpen(false)} logoutOpen={logoutOpen} />
      }
      {authUser &&
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} onLogoutOpen={() => setLogoutOpen(true)} />
      }
      <Routes>
        <Route path='/' element={authUser ? <Homepage /> : <Navigate to="/login" />} />
        <Route path='/cart' element={authUser ? <Cartpage /> : <Navigate to="/login" />} />
        <Route path='/login' element={!authUser ? <Loginpage /> : <Navigate to="/" />} />
      </Routes>
    </div>
  )
}

export default Layout