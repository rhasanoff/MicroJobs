import React from 'react'
import { Link } from 'react-router-dom'
import ReceivedMessages from './ReceivedMessages'

const Navbar = (props) => {
  const {logout} = props
  const { user, isAuth } = props.auth
  return (
    <nav id={props.id || ''} className="navbar is-fresh is-transparent no-shadow" role="navigation" aria-label="main navigation">
      <div className="container">
        <div className="navbar-brand">
          <Link to="/" className="navbar-item" href="https://cssninja.io">
             <div className="title">MicroJobs</div>
          </Link>

          <a className="navbar-item is-hidden-desktop is-hidden-tablet">
            <div id="menu-icon-wrapper" className="menu-icon-wrapper" style={{visibility: 'visible'}}>
              <svg width="1000px" height="1000px">
                  <path className="path1" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
                  <path className="path2" d="M 300 500 L 700 500"></path>
                  <path className="path3" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
              </svg>
              <button id="menu-icon-trigger" className="menu-icon-trigger"></button>
            </div>
          </a>

          <a role="button" className="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbar-menu">
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
              <span aria-hidden="true"></span>
          </a>
        </div>

        <div id="navbar-menu" className="navbar-menu is-static">
          <div className="navbar-start">
            <a className="navbar-item is-hidden-mobile">
              <div id="menu-icon-wrapper" className="menu-icon-wrapper" style={{visibility: 'visible'}}>
                <svg width="1000px" height="1000px">
                    <path className="path1" d="M 300 400 L 700 400 C 900 400 900 750 600 850 A 400 400 0 0 1 200 200 L 800 800"></path>
                    <path className="path2" d="M 300 500 L 700 500"></path>
                    <path className="path3" d="M 700 600 L 300 600 C 100 600 100 200 400 150 A 400 380 0 1 1 200 800 L 800 200"></path>
                </svg>
                <button id="menu-icon-trigger" className="menu-icon-trigger"></button>
              </div>
            </a>
          </div>

          <div className="navbar-end">
            {user &&
            <div className="navbar-item is-secondary user-welcome">
              {`Hi ${user.fullName}`}
              </div>
              }
            <Link to="/" className="navbar-item is-secondary">
                Home
            </Link>
            <Link to = "/jobs" className="navbar-item is-secondary">
                MicroJobs
            </Link>
            <Link to = "/faq" className="navbar-item is-secondary">
                FAQ
            </Link>
            {isAuth &&
            <React.Fragment>
            <div className="navbar-item has-dropdown is-hoverable">
              <a className="navbar-link">
                  Manage
              </a>
              <div className="navbar-dropdown">
                <Link to="/jobs/new" className="navbar-item">
                    Create Job
                </Link>
                <Link to="/jobs/my" className="navbar-item">
                    My Jobs
                </Link>
                <Link to="/offers/sent" className="navbar-item">
                    Sent Offers
                </Link>
                <Link to="/offers/received" className="navbar-item">
                    Received Offers
                </Link>
                <Link to="/collaborations/me" className="navbar-item">
                    Received Collaborations
                </Link>
              </div>
            </div>
            <div className="navbar-item has-dropdown is-hoverable">
            <a className="navbar-link">
                  Notifications
              </a>
              <div className="navbar-dropdown navbar-dropdown-messages">
                {user.messages && <ReceivedMessages/>}
              </div>
            </div>
            </React.Fragment>
            }
            { !isAuth &&
              <React.Fragment>
            <Link to="/login" className="navbar-item is-secondary modal-trigger" data-modal="auth-modal">
                Log in
            </Link>
            <Link to="/register" className="navbar-item">
              <span className="button signup-button rounded secondary-btn raised">
                  Register
              </span>
            </Link>
            </React.Fragment>
            }
            { isAuth &&
                <div onClick={logout}
                to="/" className="navbar-item">
                <span className="button signup-button rounded is-danger raised">
                    Logout
                </span>
              </div>
            }
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar