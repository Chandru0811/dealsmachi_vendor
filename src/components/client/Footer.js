import React from 'react';
import Logo from '../../assets/Logo_dark.png';
import { Link } from 'react-router-dom';
import { FaFacebook, FaYoutube, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { RiInstagramFill } from "react-icons/ri";

function Footer() {
  return (
    <footer className='footerBg'>
      <div className='container pt-5'>
        <div className='row text-center'>
          <div className='col-md-12'>
            <img src={Logo} alt='Dealslah' className='img-fluid mb-3' style={{ height: "3rem" }} />
          </div>
          <div className='col-md-12'>
            <ul className='footer-links list-inline'>
              <li className='list-inline-item'><Link to='/'>Home</Link></li>
              <li className='list-inline-item'><Link to='/deals'>Deals</Link></li>
              <li className='list-inline-item'><Link to='/stores'>Stores</Link></li>
              <li className='list-inline-item'><Link to='/categories'>Categories</Link></li>
              <li className='list-inline-item'><Link to='/contactus'>Contact Us</Link></li>
            </ul>
          </div>
          <div className='col-md-12 mb-3'>
            <ul className='social-icons list-inline'>
              <li className='list-inline-item'><a href='https://www.facebook.com/' target='_blank' rel="noreferrer"><FaFacebook /></a></li>
              <li className='list-inline-item'><a href='https://www.whatsapp.com/' target='_blank' rel="noreferrer"><IoLogoWhatsapp /></a></li>
              <li className='list-inline-item'><a href='https://www.instagram.com/' target='_blank' rel="noreferrer"><RiInstagramFill /></a></li>
              <li className='list-inline-item'><a href='https://www.youtube.com/' target='_blank' rel="noreferrer"><FaYoutube /></a></li>
              <li className='list-inline-item'><a href='https://in.linkedin.com/' target='_blank' rel="noreferrer"><FaLinkedinIn /></a></li>
              <li className='list-inline-item'><a href='https://x.com/?lang=en' target='_blank' rel="noreferrer"><FaTwitter /></a></li>
            </ul>
          </div>
          <hr className='mb-0' />
          <div className='col-md-12'>
            <p className='footer-text py-3 mb-0'><Link to='/termsandconditions' className='copyrights'>Terms and Conditions</Link> | <Link to='/privacypolicy' className='copyrights'>Privacy Policy</Link> | 2024 © Copyright Dealslah. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;