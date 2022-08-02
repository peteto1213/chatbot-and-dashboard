import React from 'react'
import { FaRocketchat } from 'react-icons/fa'
import { Link } from 'react-router-dom'

function Home() {

  return (
    <section className="home">
        <div className="content">
            <h3>Questions about the Digital Asset Platform?</h3>
            <p>OSL chatbot is always here for you!</p>
            <Link to='/chatbotPage' className='btn'><FaRocketchat /> Start Chatting</Link>
        </div>
    </section>
  )
}

export default Home