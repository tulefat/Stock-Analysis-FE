import { useState } from "react"
import { RegisterUser } from "../../services/Auth"
import { useNavigate } from "react-router-dom"

import "../../assets/styles/auth.css"

const Register = () => {
  let navigate = useNavigate()

  const initialState = {
    username: "",
    email: "",
    password: "",
    confirmPassword: "",

  }

  const [formValues, setFormValues] = useState(initialState)

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      username: formValues.username,

      email: formValues.email,
      password: formValues.password,
    })
    setFormValues(initialState)
    navigate("/signin")
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1 className="auth-title">Create Account</h1>
        <p className="auth-subtitle">
          Join stock analysis and create your watchlist
        </p>

        <form className="auth-form" onSubmit={handleSubmit}>
          <div>
            <label>Username</label>
            <input
              name="username"
              type="text"
              placeholder="username"
              onChange={handleChange}
              value={formValues.username}
              required
            />
          </div>


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
              placeholder="password"
              onChange={handleChange}
              value={formValues.password}
              required
            />
          </div>

          <div>
            <label>Confirm Password</label>
            <input
              name="confirmPassword"
              type="password"
              placeholder="confirm password"
              onChange={handleChange}
              value={formValues.confirmPassword}
              required
              autoComplete="off"
            />
          </div>





          <button
            disabled={
              !formValues.email ||
              !formValues.password ||
              formValues.password !== formValues.confirmPassword
            }
          >
            Register
          </button>
        </form>

        <div className="auth-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/signin")}>Login</span>
        </div>
      </div>
    </div>
  )
}

export default Register
