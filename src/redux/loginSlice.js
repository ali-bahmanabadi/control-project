import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchLogin = createAsyncThunk('login/fetchLogin', async () => {
    const response = await axios.get('http://localhost:5000/login')
    return response.data
})

export const setStatus = createAsyncThunk('login/setStatus', async (data) => {
    // const { status, userId } = data
    await axios.patch('http://localhost:5000/login', data)
    return data
})

const initialState = {
    status: 'idle',
    data: null,
}

const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchLogin.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchLogin.fulfilled]: (state, action) => {
            state.status = 'success'
            state.data = { ...state.data, ...action.payload }
        },
        [fetchLogin.rejected]: (state) => {
            state.status = 'error'
        },
        [setStatus.fulfilled]: (state, action) => {
            state.data = action.payload
        },
    },
})

export default loginSlice.reducer
