import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className='header'>
        
        <div className="logo">
            <Link to='/' >Chatbot</Link>
        </div>

        <nav className="navbar">
            <Link to='/dashbard'>Dashboard</Link>
            <Link to='/dashbard'>Login</Link>
        </nav>

    </div>

    
  )
}

export default Header