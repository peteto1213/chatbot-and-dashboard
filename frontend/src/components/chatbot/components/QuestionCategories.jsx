import React, { useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux'
import { getAllQuestionCategories } from '../../../features/questionCategory/questoinCategorySlice'

function QuestionCategories(props) {

    const { state, setState } = props
    const dispatch = useDispatch()
    const { questionCategories, isError, message } = useSelector((state) => state.questionCategory)

    //Fetch question categories data from own RESTful API
  useEffect(() => {
    dispatch(getAllQuestionCategories())

    if(isError){
      alert(message)
    }
  }, []);

  //Record client's choice of question category
  const setQuestionCategory = (categoryId, categoryName) => {
    setState(state => ({ ...state, questionCategory: categoryId, categoryName: categoryName}))

    props.actionProvider.askQuestion(categoryName)
  }

  const renderQuestionCategories = () => {
    return questionCategories.map((category) =>
        <li key={category._id} className="category" onClick={() => {setQuestionCategory(category._id, category.categoryName)}}>
            {category.categoryName}
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
