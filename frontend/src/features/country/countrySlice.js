import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import countryService from './countryService'

const initialState = {
    countries: [],
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: ''
}

//get all countries
export const getAllCountries = createAsyncThunk('/country/getAllCountries', async(_, thunkAPI) => {
    try {
        
        return await countryService.getAllCountries()

    } catch (error) {
        const message = (error.response && error.response.data && error.response.data.message ) || error.message || error.toString()

        return thunkAPI.rejectWithValue(message)
    }
})

export const countrySlice = createSlice({
    name: "country",
    initialState,
    reducers: {
        reset: (state) => {
            state.countries = []
            state.isError = false
            state.isSuccess = false
            state.isLoading = false
            state.message = ''
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllCountries.pending, (state) => {
                state.isLoading = true
            })
            .addCase(getAllCountries.fulfilled, (state, action) => {
                state.isLoading = false
                state.isSuccess = true
                state.countries = action.payload
            })
            .addCase(getAllCountries.rejected, (state, action) => {
                state.isLoading = false
                state.isSuccess = false
                state.isError = true
                state.message = action.payload
                state.countries = []
            })
    }
})

export const { reset } = countrySlice.actions
export default countrySlice.reducer