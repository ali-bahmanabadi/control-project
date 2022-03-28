import {
    createAsyncThunk,
    createEntityAdapter,
    createSlice,
} from '@reduxjs/toolkit'
import { client } from '../api/client'

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
    return await client.get('users')
})

const usersAdapter = createEntityAdapter()

export const { selectAll: selectAllUsers, selectIds: selectUserIds } =
    usersAdapter.getSelectors((state) => state.users)

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
            state.status = 'idle'
        },
        [fetchUsers.rejected]: (state, action) => {
            state.status = 'idle'
            console.log(action.payload)
        },
    },
})

export default usersSlice.reducer
