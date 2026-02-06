import { useState } from "react"
import { SignInUser } from "../../services/Auth"
import { useNavigate } from "react-router-dom"

import "../../assets/styles/auth.css"

const SignIn = ({ setUser }) => {
  let navigate = useNavigate()
  const initialState = { email: "", password: "" }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }


  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await SignInUser(formValues)


      const token = res.token
      if (token) {
        localStorage.setItem("token", token)
      }

      const user = res.user
      if (user) {
        localStorage.setItem("user", JSON.stringify(user))
        setUser(user)
        navigate("/stocks")
      } else {
        console.error("User object missing from response")
      }

      setFormValues(initialState)
    } catch (error) {
      console.error("Login failed", error)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Welcome to stock analysis</h1>
        <p className="auth-subtitle">
          Your favourite platform for evaluating stocks based on intrinsic value
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label>Email</label>
            <input
              name="email"
              type="email"
              placeholder="example@example.com"
              onChange={handleChange}
              value={formValues.email}
              required
            />
          </div>

          <div>
            <label>Password</label>
            <input
              name="password"
              type="password"
              placeholder="••••••••"
              onChange={handleChange}
              value={formValues.password}
              required
            />
          </div>

          <button disabled={!formValues.email || !formValues.password}>
            Login
          </button>
        </form>

        <div className="auth-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Sign Up</span>
        </div>
      </div>
    </div>
  )
}

export default SignIn
