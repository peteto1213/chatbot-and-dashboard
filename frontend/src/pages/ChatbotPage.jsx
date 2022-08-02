import React from 'react'
import Chatbot from 'react-chatbot-kit'
import 'react-chatbot-kit/build/main.css';

import config from '../components/chatbot/config'
import MessageParser from '../components/chatbot/MessageParser'
import ActionProvider from '../components/chatbot/ActionProvider'

function ChatbotPage() {
  return (
    <section className='chatbotPage'>
        
          <Chatbot
            config={config}
            messageParser={MessageParser}
            actionProvider={ActionProvider}
            placeholderText='Type message here...'
          />

    </section>
  )
}

export default ChatbotPage