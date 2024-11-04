import React from 'react'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa';
import { FaGoogle } from 'react-icons/fa6';

function SocialMediaIcons() {
  return (
    <div className="social-media">
    <a href="#" className="social-icon"><FaFacebook style={{fontSize:'26px'}}/></a>
      <a href="#" className="social-icon"><FaTwitter style={{fontSize:'26px'}}/></a>
      <a href="#" className="social-icon"><FaGoogle style={{fontSize:'26px'}}/></a>
      <a href="#" className="social-icon"><FaInstagram style={{fontSize:'26px'}}/></a>
    </div>
  )
}

export default SocialMediaIcons;