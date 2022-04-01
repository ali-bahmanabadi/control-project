import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { client } from '../api/client'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    return await client.get('http://localhost:5000/tasks')
})

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async (taskData) => {
        return await axios.post('http://localhost:5000/tasks', taskData)
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId) => {
        return await axios.delete(`http://localhost:5000/tasks/${taskId}`)
    }
)

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
            tasksAdapter.upsertMany(state, action.payload)
            state.status = 'success'
        },
        [fetchTasks.rejected]: (state, action) => {
            state.status = 'error'
            console.log(action.payload)
        },
        [addNewTask.fulfilled]: tasksAdapter.addOne,
        [deleteTask.fulfilled]: tasksAdapter.removeOne,
    },
})

export default tasksSlice.reducer
