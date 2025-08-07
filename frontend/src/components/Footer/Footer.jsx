import React from 'react'

import './Footer.css'
import { assets } from '../../assets/assets'
const Footer = () => {
    return (
        <div className='footer' id='footer'>
            <div className='footer-content'>
                <div className='footer-content-left'>
                    <img src={assets.logo} />
                    <p> Foodie – Because great taste never goes out of style.
                        From bold bites to comforting classics, we serve joy on every plate.
                        Crafted with passion, delivered with love.
                        Thanks for making us a part of your cravings. </p>
                    {/* <div className='footer-social-icons'>
                        <img src={assets.facebook_icon} />
                        <img src={assets.twitter_icon} />
                        <img src={assets.linkedin_icon} />
                    </div> */}
                    <div className='footer-social-icons'>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <img src={assets.facebook_icon} alt="Facebook" />
  </a>
  <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <img src={assets.twitter_icon} alt="Twitter" />
  </a>
  <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
    <img src={assets.linkedin_icon} alt="LinkedIn" />
  </a>
</div>

                </div>
                <div className='footer-content-center'>
                    <h2>COMPANY</h2>
                    <ul>
                         {/* <li>Home</li>
                        <li>About us</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>  */}
                        <li><a href="/">Home</a></li>
    <li><a href="#about-us">About Us</a></li>
    <li><a href="#app-download">Delivery</a></li>
    <li><a href="#privacy-policy">Privacy Policy</a></li>



                    </ul>
                </div>
                <div className='footer-content-right'>
                    <h2>Contact Us At :- </h2>
                    <ul>
                        <li>Phone: +91 6205081291</li>
                        <li>Email: hello@foodiee.com </li>
                        <li>Address : foodie-Hub , Mantripukhri , Imphal West , 795002</li>
                    </ul>
                </div>
            </div>
            <hr />
            <p className='footer-copyright'>Copyright 2025 © Foodiee.com - All Rights Reserved.</p>
        </div>
    )
}

export default Footer