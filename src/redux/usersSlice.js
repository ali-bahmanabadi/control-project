import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { client } from '../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await client.get('http://localhost:5000/users')
})

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        return await axios.delete(`http://localhost:5000/users/${userId}`)
    }
)

export const addNewUser = createAsyncThunk('users/addNewUser', async (data) => {
    return await axios.post('http://localhost:5000/users', data)
})

export const updateUser = createAsyncThunk('users/updateUser', async (data) => {
    const { userId, ...option } = data
    return await axios.patch(`http://localhost:5000/users/${userId}`, option)
})

const usersAdapter = createEntityAdapter()

export const {
    selectAll: selectAllUsers,
    selectEntities: selectUsersEntities,
    selectById: selectUserById,
} = usersAdapter.getSelectors((state) => state.users)

const initialState = usersAdapter.getInitialState({
    status: 'idle',
})

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchUsers.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchUsers.fulfilled]: (state, action) => {
            // state.entities = action.payload
            usersAdapter.upsertMany(state, action.payload)
            state.status = 'success'
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'error'
            console.log(action.payload)
        },
        [deleteUser.fulfilled]: usersAdapter.removeOne,
        [addNewUser.fulfilled]: usersAdapter.addOne,
        [updateUser.fulfilled]: usersAdapter.updateOne,
    },
})

export default usersSlice.reducer
