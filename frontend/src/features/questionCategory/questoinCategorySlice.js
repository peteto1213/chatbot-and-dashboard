import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import questionCategoryService from './questionCategoryService'

const initialState = {
    questionCategories: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//get all question categories
export const getAllQuestionCategories = createAsyncThunk('/questionCategory/getAllQuestionCategories', async(_, thunkAPI) => {
    try {
        
        return await questionCategoryService.getAllQuestionCategories()

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const questionCategorySlice = createSlice({
    name: "questionCategory",
    initialState,
    reducers: {
        reset: (state) => {
            state.questionCategories = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllQuestionCategories.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllQuestionCategories.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.questionCategories = action.payload
            })
            .addCase(getAllQuestionCategories.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.questionCategories = []
            })
    }
})

export const { reset } = questionCategorySlice.actions
export default questionCategorySlice.reducer