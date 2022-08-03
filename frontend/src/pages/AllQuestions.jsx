import React, { useState, useEffect } from 'react'
import { FaQuestionCircle, FaStream, FaAngleRight } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEnquiries, getEnquiriesByCountryId, getEnquiriesByQuestionCategoryId } from '../features/enquiry/enquirySlice'
import { getAllCountries } from '../features/country/countrySlice'
import { getAllQuestionCategories } from '../features/questionCategory/questoinCategorySlice'
import Spinner from '../components/Spinner'

function AllQuestions() {

    const dispatch = useDispatch()
    const { enquiries, isLoading, isError, message } = useSelector((state) => state.enquiry)
    const { countries } = useSelector((state) => state.country)
    const { questionCategories } = useSelector((state) => state.questionCategory)

    //fetch all enquiries from database
    useEffect(() => {
        dispatch(getAllEnquiries())
        dispatch(getAllCountries())
        dispatch(getAllQuestionCategories())

        if(isError){
            alert(message)
        }
    }, [])

    //Hamburgure menu to handle responsive layout
    const [menuState, setMenuState] = useState(true)

    const toggleMenu = () => {
        setMenuState(!menuState)
    }

    const hideMenu = () => {
        setMenuState(true)
    }

    //Filter enquiries by question category id
    const filterByQuestionCategoryId = (questionCategoryId) => {
        dispatch(getEnquiriesByQuestionCategoryId(questionCategoryId))
        hideMenu()
    }

    //Filter enquiries by country id
    const filterByCountryId = (countryId) => {
        dispatch(getEnquiriesByCountryId(countryId))
        hideMenu()
    }

    //Reset with no filters
    const showAllEnquiries = () => {
        dispatch(getAllEnquiries())
        hideMenu()
    }

    if(isLoading){
        return <Spinner />
    }

  return (
    <section className="all-questions">
        <div className="heading">
            <FaQuestionCircle className='icon' />
            <h1>All Enquiries</h1>
            <FaStream onClick={toggleMenu} id='stream' />
        </div>

        <div className="content">
            <div className="all-enquiries">
                <table className='enquiry-table'>

                    <thead>
                        <tr>
                            <th>Client nickname</th>
                            <th>Category</th>
                            <th>Question</th>
                            <th>Country</th>
                        </tr>
                    </thead>

                    <tbody>
                        {/* Enquiries map */}
                        {
                            enquiries.map((enquiry) =>
                                <tr key={enquiry._id}>
                                    <td>{enquiry.clientNickname}</td>
                                    <td>{enquiry.questionCategory.categoryName}</td>
                                    <td>{enquiry.question}</td>
                                    <td>{enquiry.country.countryISO}</td>
                                </tr>
                            )
                        }
                        
                    </tbody>

                </table>

                {enquiries.length === 0 &&
                    <p className="no-wordings">
                        No client enquiries record found for this question category/country
                    </p>
                }
            </div>

            <div className={menuState? "sidebar" : "sidebar active"}>
                <div className="category-bar">
                    <h3>Question Categories</h3>
                    <p className="category" onClick={showAllEnquiries}>
                        <FaAngleRight />All Questions
                    </p>
                    {/* question categories map */}
                    {
                        questionCategories.map(category => 
                            <p className='category' key={category._id} onClick={() => {filterByQuestionCategoryId(category._id)}}>
                                <FaAngleRight />{category.categoryName}
                            </p>
                        )
                    }
                </div>

                <div className="category-bar">
                    <h3>Countries</h3>
                    {/* countries map */}
                    {
                        countries.map(country =>
                            <p className="category" key={country._id} onClick={() => {filterByCountryId(country._id)}}>
                                <FaAngleRight />{country.countryISO}
                            </p>
                        )
                    }
                </div>
            </div>
        </div>

    </section>
  )
}

export default AllQuestions