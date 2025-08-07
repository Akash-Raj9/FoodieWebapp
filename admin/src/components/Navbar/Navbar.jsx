
import React from 'react'
import './Navbar.css'
import { assets } from '../../assets/assets'

const Navbar = () => {
  return (
    <div className='navbar'>
      <img className='logo' src={assets.logo} alt='Logo' />
      
      <h3>
        Admin Hub
        <p>
          Welcome to the Foodiee Admin Dashboard. Manage menus, track orders, and keep the flavor flowing. <br />
          Your control center for everything delicious 🍽️. <br />
          Craft the experience your customers crave — right from here.
        </p>
      </h3>

      <img className='profile' src={assets.profile_image} alt='Admin Profile' />
    </div>
  )
}

export default Navbar

