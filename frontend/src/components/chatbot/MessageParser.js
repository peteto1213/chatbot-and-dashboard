import React from 'react';

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    const lowercase = message.toLowerCase()
    const { clientNickname, questionCategory } = children.props.state

    //Message Parser rule sets
    if(!clientNickname){
      //check valid input of nickname (only accept alphabets, numbers, underscore and dash symbol)
      if((/[!@#\$%\^\&*\(\)\/\\+=.]/g).test(lowercase) || (!message)){
      actions.invalidNickname()
      }else{
        actions.chooseCategory(message)
      }

    }else if(questionCategory){
      //If we got both client's nickname and question category, record their question and ask about their country
      actions.displayQuestion(message)
      
    }else{
      //if client wish to change his/her name, remind them to refresh the page
      actions.restartMessage()
    }

    //Set 2 - detect user's choice of question category
    



    console.log(children.props.state);
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
