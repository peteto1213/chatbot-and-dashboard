import React from 'react'
import { useEffect } from 'react'
import { FaTags } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { getAllEnquiries } from '../features/enquiry/enquirySlice'
import Spinner from '../components/Spinner'

import TreeMap from "react-d3-treemap";
import "react-d3-treemap/dist/react.d3.treemap.css";

function QuestionCategory() {

    const dispatch = useDispatch()
    const { enquiries, isLoading, isError, message } = useSelector((state) => state.enquiry)

    // Fetch all enquiries
    useEffect(() => {
        dispatch(getAllEnquiries())

        if(isError){
            alert(message)
        }
    }, [])

    if(isLoading){
        return <Spinner />
    }


    // Use a hash map to create a key-value set <categoryName, numberOfResponse>
    // From the raw data set
    let hashMap = new Map()

    enquiries.map((enquiry) => {
        let categoryName = enquiry.questionCategory.categoryName
        if(hashMap.has(categoryName)){
            let value = hashMap.get(categoryName)
            value++
            hashMap.set(categoryName, value)
        }else{
            hashMap.set(categoryName, 1)
        }
    })

    // Declare a dataSet to be used 
    let data = {
        name: "All Categories",
        value: 0,
        children: []
    }

    /**
     * Convert the hash map above to object array to be used in the tree map component
     * {name: key, value: value}
     */
    data.children = Array.from(hashMap, ([key, value]) => {
        return {name: key, value: value}
    })

  return (
    <section className='question-category'>
        <div className="heading">
            <FaTags className='icon' />
            <h1>Question Category Distribution</h1>
        </div>

        <div className="treemap-container">
            <TreeMap 
                id='treemap'
                width={1000}
                height={600}
                data={data}
                valueUnit={"response(s)"}
            />
        </div>

    </section>
  )
}

export default QuestionCategory