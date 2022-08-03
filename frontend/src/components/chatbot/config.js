import { createChatBotMessage } from "react-chatbot-kit";
import QuestionCategories from "./components/QuestionCategories";
import Countries from "./components/Countries";

const botName = "OSL helper"

const config = {

  initialMessages: [
    createChatBotMessage(`Hi! I'm ${botName}, nice to meet you!`),
    createChatBotMessage("What should I call you?")
  ],
  state: {
    clientNickname: "",
    questionCategories: [],
    questionCategory: "",
    question: "",
    countries: [],
    country: ""
  },
  widgets: [
    {
      widgetName: "questionCategories",
      widgetFunc: (props) => <QuestionCategories {...props} />,
      mapStateToProps: ["questionCategories"]
    },
    {
      widgetName: "countries",
      widgetFunc: (props) => <Countries {...props} />,
      mapStateToProps: ["countries"]
    }
  ]

};

export default config