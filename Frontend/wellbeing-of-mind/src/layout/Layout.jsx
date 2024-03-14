import React, { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faNewspaper, faVial, faUsers, faHome, faInfoCircle, faShieldAlt, faUser, faBook, faSun, faMoon } from '@fortawesome/free-solid-svg-icons';
import './Layout.css';

const Layout = () => {
  // State to manage the theme
  const [darkTheme, setDarkTheme] = useState(false);

  // Function to toggle the theme
  const toggleTheme = () => {
    setDarkTheme(prevTheme => !prevTheme);
  };

  return (
    <div className={`container-fluid px-0 ${darkTheme ? 'dark-theme' : 'light-theme'}`}>
      {/* Mobile View */}
      <nav className={`navbar navbar-expand-md navbar-dark ${darkTheme ? 'bg-dark' : 'bg-primary'} d-md-none`}>
        <div className="container-fluid d-flex justify-content-center">
          <Link className="navbar-brand" to="/">
            Wellbeing of Mind
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
        </div>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav d-flex align-items-center justify-content-between w-100">
            <li className="nav-item">
              <Link className="nav-link" to="/articles">
                <FontAwesomeIcon icon={faNewspaper} /> Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tests">
                <FontAwesomeIcon icon={faVial} /> Tests
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/consultations">
                <FontAwesomeIcon icon={faUsers} /> Consultations
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FontAwesomeIcon icon={faUser} /> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <FontAwesomeIcon icon={faBook} /> Register User
              </Link>
            </li>
          </ul>
        </div>
      </nav> 

      {/* Large Screen View */}
      <nav className={`navbar navbar-expand-md navbar-dark ${darkTheme ? 'bg-dark' : 'bg-primary'} d-none d-md-flex`}>
        <div className="container-fluid">
          <ul className="navbar-nav flex-fill">
            <li className="nav-item">
              <Link className="nav-link" to="/articles">
                <FontAwesomeIcon icon={faNewspaper} /> Articles
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/tests">
                <FontAwesomeIcon icon={faVial} /> Tests
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/consultations">
                <FontAwesomeIcon icon={faUsers} /> Consultations
              </Link>
            </li>
          </ul>
          <Link className="navbar-brand mx-auto" to="/">
            WoM
          </Link>
          <ul className="navbar-nav flex-fill justify-content-end">
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/login">
                <FontAwesomeIcon icon={faUser} /> Login
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/register">
                <FontAwesomeIcon icon={faBook} /> Register
              </Link>
            </li>
            <li className="nav-item">
              <button className="nav-link mb-0 my-auto" style={{ minWidth: "32px"}} onClick={toggleTheme}>
                <FontAwesomeIcon icon={darkTheme ? faSun : faMoon} />
              </button>
            </li>
          </ul>
        </div>
      </nav>
      
      <Outlet />
    </div>
  );
};

export default Layout;
