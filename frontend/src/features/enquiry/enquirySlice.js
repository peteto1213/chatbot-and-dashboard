import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import enquiryService from './enquiryService'

const initialState = {
    enquiries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
    newEnquiry: ''
}

//get all enquiries
export const getAllEnquiries = createAsyncThunk('/enquiry/getAllEnquiries', async(_, thunkAPI) => {
    try {
        
        return await enquiryService.getAllEnquiries()

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//upload an enquiry from a client
export const uploadEnquiry = createAsyncThunk('/enquiry/uploadEnquiry', async(body, thunkAPI) => {
    try {
        
        return await enquiryService.uploadEnquiry(body)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//get enquiries by question category id
export const getEnquiriesByQuestionCategoryId = createAsyncThunk('/enquiry/getByQuestionCategoryId', async(questionCategoryId, thunkAPI) => {
    try {
        
        return await enquiryService.getEnquiriesByQuestionCategoryId(questionCategoryId)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

//get enquiries by country id
export const getEnquiriesByCountryId = createAsyncThunk('/enquiry/getByCountryId', async(countryId, thunkAPI) => {
    try {
        
        return await enquiryService.getEnquiriesByCountryId(countryId)

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const enquirySlice = createSlice({
    name: "enquiry",
    initialState,
    reducers: {
        reset: (state) => {
            state.enquiries = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
            state.newEnquiry = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllEnquiries.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllEnquiries.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.enquiries = action.payload
            })
            .addCase(getAllEnquiries.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.enquiries = []
            })
            .addCase(uploadEnquiry.pending, (state) => {
                state.isLoading = true
            })
            .addCase(uploadEnquiry.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.newEnquiry = action.payload
            })
            .addCase(uploadEnquiry.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.newEnquiry = ''
            })
            .addCase(getEnquiriesByQuestionCategoryId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEnquiriesByQuestionCategoryId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.enquiries = action.payload
            })
            .addCase(getEnquiriesByQuestionCategoryId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.enquiries = []
            })
            .addCase(getEnquiriesByCountryId.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getEnquiriesByCountryId.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.enquiries = action.payload
            })
            .addCase(getEnquiriesByCountryId.rejected, (state, action) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.enquiries = []
            })
    }
})

export const { reset } = enquirySlice.actions
export default enquirySlice.reducer