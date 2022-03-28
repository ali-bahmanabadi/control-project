import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../api/client'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    return await client.get('tasks')
})

const tasksAdapter = createEntityAdapter()

export const {
    selectById: selectTaskById,
    selectIds: selectTaskIds,
    selectEntities: selectTasks,
} = tasksAdapter.getSelectors((state) => state.tasks)

const initialState = tasksAdapter.getInitialState({
    status: 'idle',
})

const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchTasks.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchTasks.fulfilled]: (state, action) => {
            // state.entities = action.payload
            tasksAdapter.upsertMany(state, action.payload)
            state.status = 'idle'
        },
        [fetchTasks.rejected]: (state, action) => {
            state.status = 'idle'
            console.log(action.payload)
        },
    },
})

export default tasksSlice.reducer
