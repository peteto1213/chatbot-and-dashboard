import React from 'react';

const ActionProvider = ({ createChatBotMessage, setState, children }) => {
  //Actions related to the user input
  
  /**
   * @author Pete To
   * @description Action 1: Nickname error function
   */
  const invalidNickname = () => {
    const message = createChatBotMessage("It seems that this is not a valid name, a name should only contains alphabet or numbers, please try again!")

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))

  }

  /**
   * @author Pete To
   * @description Action 2: Choose question category
   * @param {*} nickname 
   */
  const chooseCategory = (nickname) => {
    //Step 1: greet the client by the input nickname
    //Step 2: provide the client with the question categories
    const message = createChatBotMessage(`Hello ${nickname}, what can I help you?`, {
      widget: "questionCategories"
    })

    //Step 3: save the client nickname to state after copying the previous state
    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
      clientNickname: nickname
    }))

  }

  /**
   * @author Pete To
   * @description Action 3: Require user to ask a question
   * @param {*} questionCategory 
   */
  const askQuestion = (questionCategory) => {
    const message = createChatBotMessage(`No problem! What is your question about ${questionCategory} ?`)

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }

  /**
   * @author Pete To
   * @description Action 4: Display client's question
   * @param {*} question 
   */
  const displayQuestion = (question) => {
    const message = createChatBotMessage(`The question you have asked: ${question}`)

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))

    askCountry()
  }

  /**
   * @author Pete To
   * @description Action 5: Require user to answer country of origin
   */
  const askCountry = () => {
    const message = createChatBotMessage("Finally, could you please kindly mention which country are you from ?", {
      widget: "countries"
    })

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))

  }

  /**
   * @author Pete To
   * @description Action 6: Notify users that the response has been submitted
   */
  const notifyResults = () => {
    const message = createChatBotMessage("Your response is successfully submitted! Thank you for your enquiry.")

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }


  /**
   * @author Pete To
   * @description Action: Remind user to refresh page if they would like to change their nickname
   */
  const restartMessage = () => {
    const message = createChatBotMessage("It seems that you have already entered your name, if you wish to edit, please refresh the page")

    setState((prev) => ({
      ...prev,
      messages: [...prev.messages, message],
    }))
  }


  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          actions: {
            invalidNickname,
            chooseCategory,
            askQuestion,
            restartMessage,
            displayQuestion,
            askCountry,
            notifyResults
          },
        });
      })}
    </div>
  );
};

export default ActionProvider;
