import React, { useEffect } from "react";

function QuestionCategories(props) {

    const { state, setState } = props

    //Fetch question categories data from own RESTful API
  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        const firstFive = data.slice(0, 6)
        setState(state => ({ ...state, questionCategories: firstFive}))
      })
  }, []);

  //Record client's choice of question category
  const setQuestionCategory = (categoryId) => {
    setState(state => ({ ...state, questionCategory: categoryId}))
    props.actionProvider.askQuestion(categoryId)
  }

  const renderQuestionCategories = () => {
    return state.questionCategories.map((category) =>
        <li key={category.id} className="category" onClick={() => {setQuestionCategory(category.id)}}>
            {category.name}
        </li>
    )
  }

  return (
        <div className="question-categories-widget">
            <ul className="all-categories">
                {renderQuestionCategories()}
            </ul>
        </div>
    )
}

export default QuestionCategories;
