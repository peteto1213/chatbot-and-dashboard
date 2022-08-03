import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const { clientNickname, questionCategory, country, question } = children.props.state

    //Message Parser rule sets
    //If there is no client nickname, prompt to input a nickname and choose for category
    if(!clientNickname){
      //check valid input of nickname (only accept alphabets, numbers, underscore and dash symbol)
      if((/[!@#\$%\^\&*\(\)\/\\+=.]/g).test(message) || (!message)){
        actions.invalidNickname()
      }else{
        actions.chooseCategory(message)
      }
    }
    else if(questionCategory && !question){
      //check valid input of question (cannot be blank or more than 200 characters)
      if(message.length > 200 || !message){
        actions.restartMessage("Question cannot be blank or more than 200 characters, Please try again!")
      }else{
        actions.displayQuestion(message)
      } 
    }
    // check if client has filled out all the information
    else{
      if(clientNickname && questionCategory && question && country){
        actions.notifyEndOfSession()
      }
      else{
        //default error message - follow instruction
        actions.restartMessage("Please follow the instruction")
      }
    }
  };

  return (
    <div>
      {React.Children.map(children, (child) => {
        return React.cloneElement(child, {
          parse: parse,
          actions,
        });
      })}
    </div>
  );
};

export default MessageParser;
