import { useState, useEffect } from "react"
import "./App.css"
import { Routes, Route } from "react-router-dom"

import { CheckSession } from "./services/Auth"
import Nav from "./components/common/Navbar"

import Home from "./pages/auth/Home"
import SignIn from "./pages/auth/SignIn"
import Register from "./pages/auth/Register"
import Feed from "./pages/auth/Feed"

import StocksHome from "./pages/stocks/Home"
import Analysis from "./pages/analysis/Analysis"


const App = () => {
  const [user, setUser] = useState(null)

  const handleLogOut = () => {
    setUser(null)
    localStorage.clear()
  }

  const checkToken = async () => {
    const userData = await CheckSession()
    setUser(userData)
  }

  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) checkToken()
  }, [])

  return (
    <>
      <Nav user={user} handleLogOut={handleLogOut} />

      <main>
        <Routes>

          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn setUser={setUser} />} />
          <Route path="/register" element={<Register />} />

          {/* Protected-ish Pages */}
          <Route path="/feed" element={<Feed user={user} />} />

          {/* Stocks */}
          <Route path="/stocks" element={<StocksHome user={user} />} />
          <Route path="/analysis/:symbol" element={<Analysis user={user}/>}/>
        </Routes>
      </main>
    </>
  )
}

export default App
