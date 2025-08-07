
import React, { useContext, useState } from 'react';
import './Navbar.css';
import { assets } from '../../assets/assets';
import { Link, useNavigate } from 'react-router-dom';
import { StoreContext } from '../../context/StoreContext';
import DarkModeToggle from '../DarkModeToggle/DarkModeToggle';

const Navbar = ({ setShowLogin }) => {
  const [menu, setMenu] = useState("home");
  const [showSearch, setShowSearch] = useState(false); 
  const { searchText, setSearchText } = useContext(StoreContext); 
  const { getTotalCartAmount, token, setToken,setSearchQuery } = useContext(StoreContext);
  const navigate = useNavigate();

  const logOut = () => {
    localStorage.removeItem("token");
    setToken("");
    navigate("/");
  };

  return (
    <nav className='navbar'>
      <Link to='/' className='navbar-logo'>
        <img src={assets.logo} alt='Foodiee Logo' className='logo' />
      </Link>

      <ul className='navbar-menu'>
         <ul className='navbar-menu'>
        <li>
          <Link 
            to='/' 
            className={menu === "home" ? "active" : ""} 
            onClick={() => setMenu("home")}
          >
            Home
          </Link>
        </li>
        <li>
          <a 
            href='#explore-menu' 
            className={menu === "menu" ? "active" : ""} 
            onClick={() => setMenu("menu")}
          >
            Menu
          </a>
        </li>
        <li>
          <a 
            href='#app-download' 
            className={menu === "mobile-app" ? "active" : ""} 
            onClick={() => setMenu("mobile-app")}
          >
            Mobile App
          </a>
        </li>
        <li>
          <a 
            href='#footer' 
            className={menu === "contact-us" ? "active" : ""} 
            onClick={() => setMenu("contact-us")}
          >
            Contact Us
          </a>
        </li>
      </ul>
 
      </ul>

      <div className='navbar-right'>
        {/* <DarkModeToggle /> */}
        <div className='navbar-search'>
          <img
            src={assets.search_icon}
            alt='Search'
            className='nav-icon'
            onClick={() => {
              setShowSearch(prev => {
                const newState = !prev;
                if (!newState) setSearchQuery(""); 
                return newState;
              });
            }}
            
            style={{ cursor: 'pointer' }}
          />
          {showSearch && (
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              value={searchText}
              onChange={(e) => {
                setSearchText(e.target.value);
              }}
            />
          )}
        </div>

        <div className='navbar-search-icon'>
          <Link to='/cart'>
            <img src={assets.basket_icon} alt='Cart' className='nav-icon' />
          </Link>
          {getTotalCartAmount() !== 0 && <div className="dot"></div>}
        </div>

        {!token ? (
          <button onClick={() => setShowLogin(true)} className='login-btn'>
            Sign In
          </button>
        ) : (
          <div className='navbar-profile'>
            <img src={assets.profile_icon} alt='Profile' className='profile-icon' />
            <ul className='nav-profile-dropdown'>
              <li onClick={() => navigate('/myorders')}>
                <img src={assets.bag_icon} alt='Orders' />
                <p>Orders</p>
              </li>
              <hr />
              <li onClick={logOut}>
                <img src={assets.logout_icon} alt='Logout' />
                <p>Logout</p>
              </li>
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

