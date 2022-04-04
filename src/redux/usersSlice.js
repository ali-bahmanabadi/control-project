import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    const Response = await axios.get('http://localhost:5000/users')
    return Response.data
})

export const deleteUser = createAsyncThunk(
    'users/deleteUser',
    async (userId) => {
        await axios.delete(`http://localhost:5000/users/${userId}`)
        return userId
    }
)

export const addNewUser = createAsyncThunk('users/addNewUser', async (data) => {
    await axios.post('http://localhost:5000/users', data)
    return data
})

export const updateUser = createAsyncThunk('users/updateUser', async (data) => {
    const { userId, ...option } = data
    await axios.patch(`http://localhost:5000/users/${userId}`, option)
    return data
})

const usersAdapter = createEntityAdapter()

export const {
    selectAll: selectAllUsers,
    selectEntities: selectUsersEntities,
    selectById: selectUserById,
    selectIds: selectUsersIds,
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
            usersAdapter.upsertMany(state, action.payload)
            state.status = 'success'
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'error'
            console.log(action.payload)
        },
        [deleteUser.fulfilled]: usersAdapter.removeOne,
        [addNewUser.fulfilled]: usersAdapter.addOne,
        [updateUser.fulfilled]: (state, action) => {
            const { userId, ...option } = action.payload
            state.entities[userId] = { ...state.entities[userId], ...option }
        },
    },
})

export default usersSlice.reducer
