import { Link, NavLink, useNavigate } from "react-router-dom"
import "../../assets/styles/navbar.css"

import logo from "../../assets/images/stock_analysis-FE.png"

const Nav = ({ user, handleLogOut }) => {
  const navigate = useNavigate()


  const onLogoutClick = (e) => {
    e.preventDefault()
    handleLogOut()
    navigate("/signin")
  }

  return (
    <header className="stock-analysis-nav">
      <div className="stock-analysis-nav__inner">
        <Link to="/" className="stock-analysis-nav__brand">
          <img className="stock-analysis-nav__logo" src={logo} alt="stock-analysis" />
          <span className="stock-analysis-nav__title">stock analysis</span>
        </Link>

        <nav className="stock-analysis-nav__links">
          {!user ? (
            <>
              <NavLink className="stock-analysis-nav__link" to="/">
                Home
              </NavLink>
              <NavLink className="stock-analysis-nav__link" to="/register">
                Register
              </NavLink>
              <NavLink className="stock-analysis-nav__link stock-analysis-nav__btn" to="/signin">
                Sign In
              </NavLink>
            </>
          ) : (
            <>
              <div className="stock-analysis-nav__user">
                <span className="stock-analysis-nav__hello">Welcome,</span>
                <span className="stock-analysis-nav__name">
                  {user.name}
                  </span>
              </div>

              <NavLink className="stock-analysis-nav__link" to="/stocks">
                Stocks
              </NavLink>


              <button
                className="stock-analysis-nav__link stock-analysis-nav__btn"

                onClick={onLogoutClick}
              >
                Sign Out
              </button>
            </>
          )}
        </nav>
      </div>
    </header>
  )
}

export default Nav
