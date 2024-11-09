import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import './Nav.css';

export default function Nav() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedIn = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loggedIn === 'true'); 
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isLoggedIn'); 
    setIsLoggedIn(false);
    navigate('/'); 
  };

  return (
    <div>
      <nav>
        <div className="navbar">
          <div className="container nav-container">
            <input className="checkbox" type="checkbox" id="menu-toggle" />
            <div className="hamburger-lines">
              <span className="line line1"></span>
              <span className="line line2"></span>
              <span className="line line3"></span>
            </div>
            <div className="logo">
              <h1>BlogBurst</h1>
            </div>
            <ul className="menu-items">
              <li><Link to="/">Home</Link></li>
              {isLoggedIn ? (
                <>
                  <li><Link to="/upload" className="logout-btn">Upload Blog</Link></li> 
                  <li onClick={handleLogout} className="logout-btn">Logout</li> 
                </>
              ) : (
                <li><Link to="/register">Register</Link></li> 
              )}
              <li><Link to="/blogs">Blogs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
}
