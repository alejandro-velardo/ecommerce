import './App.css'
import { useState, useEffect } from 'react'
import GlobalContext from "./context/GlobalContext";

import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom"
import jwt_decode from 'jwt-decode'

import Menu from './components/Menu'
import Footer from './components/Footer'

import Home from './pages/Home'
import Cart from './pages/Cart'
import Articles from './pages/Articles'
import Login from './pages/Login'
import Register from './pages/Register'
import Profile from './pages/Profile'
import Error from './pages/Error';

function App() {
  const navigate = useNavigate()
  const [cart, setCart] = useState([])
  const [token, setToken] = useState("")
  const [error, setError] =  useState("")
  const [user, setUser] = useState({
    email: "",
    password: "",
    errors: {
      email: [],
      password: []
    }
  })

  useEffect(() => {
    console.log("checking token in browser")
    const tk = localStorage.getItem('authToken')
    if (tk) {
      console.log("there is token in browser")

      setToken(tk)
    }
  }, [])


  useEffect(() => {
    if (token) {
      const decoded = jwt_decode(token)
      localStorage.setItem('authToken', token)
      setUser(
        (prevUser) => ({
          ...prevUser,
          email: decoded.email,
          idClient: decoded.idclient
        })
      )
    } else {
      setUser(
        (prevUser) => ({
          ...prevUser,
          email: ''
        }))
    }
  }, [token])

  const logOut = () => {
    setToken('')
    localStorage.removeItem('authToken')
    navigate("/")
  }

  const proceedToCheckout = () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type' : 'application/json',
        'authorization': token
      },
      body: JSON.stringify({cart: cart})
    }

    fetch(`http://localhost:3050/api/clients/${user.idClient}/purchase`, requestOptions)
    .then(response => {
      response.json()
    })
    .then(response => {
      console.log(response)
    })
    .catch(error => {
      console.log(error)
    })

  }


  const context = { cart, setCart, token, setToken, user, setUser, error, setError, logOut, proceedToCheckout }

  return (
    <GlobalContext.Provider value={context}>

      <div className="App">
          <Menu />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/articles" element={<Articles />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/error" element={<Error />} />


          </Routes>
          <Footer />
      </div>
    </GlobalContext.Provider>

  )
}

export default App
