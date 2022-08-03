import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import enquiryService from './enquiryService'

const initialState = {
    enquiries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
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
    }
})

export const { reset } = enquirySlice.actions
export default enquirySlice.reducer