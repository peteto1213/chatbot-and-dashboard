import React from 'react'
import { Link } from 'react-router-dom'
import { FaSearchLocation, FaTags, FaUserAlt, FaQuestionCircle, FaSignOutAlt, FaTimes, FaRegPaperPlane, FaRobot } from 'react-icons/fa'
import { useState } from 'react'

function Header() {

  const[menu, setMenu] = useState(false)

  //show drop down menu to fit different device screen width
  const showMenu = () => {
    setMenu(true)
  }

  //hide menu when user perform some kinds of action
  const hideMenu = () => {
    setMenu(false)
  }

  window.onscroll = () => {
    hideMenu()
  }


  return (
    <div className='header'>
        
        {/* Homepage links */}
        <div className="logo">
            <Link to='/' onClick={hideMenu} ><FaRobot />Chatbot</Link>
        </div>

        {/* Page navigation links */}
        <nav className={menu? "navbar active" : "navbar"}>
            <Link to='/dashbard' onClick={hideMenu}><FaSearchLocation />Geographical Data</Link>
            <Link to='/dashbard' onClick={hideMenu}><FaTags />Question Category Distribution</Link>
            <Link to='/dashbard' onClick={hideMenu}><FaQuestionCircle />All Questions</Link>
            <Link to='/dashbard' onClick={hideMenu}><FaUserAlt />Login</Link>
        </nav>

        {/* Responsive layout based on accessing device screen width */}
        {menu ?
                <FaTimes 
                    className='icon' 
                    id='menu-bars'
                    onClick={hideMenu} 
                />
                :
                <FaRegPaperPlane 
                    className='icon' 
                    id='menu-bars'
                    onClick={showMenu} 
                />
        }

    </div>

    
  )
}

export default Header