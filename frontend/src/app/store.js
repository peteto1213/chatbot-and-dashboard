import { configureStore } from '@reduxjs/toolkit';
import enquiryReducer from '../features/enquiry/enquirySlice';
import questionCategoryReducer from '../features/questionCategory/questoinCategorySlice';
import countryReducer from '../features/country/countrySlice';

export const store = configureStore({
  reducer: {
    enquiry: enquiryReducer,
    questionCategory: questionCategoryReducer,
    country: countryReducer
  },
});
