import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios'

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const response = await axios.get('http://localhost:5000/tasks')
    return response.data
})

export const addNewTask = createAsyncThunk(
    'tasks/addNewTask',
    async (taskData) => {
        await axios.post('http://localhost:5000/tasks', taskData)
        return taskData
    }
)

export const deleteTask = createAsyncThunk(
    'tasks/deleteTask',
    async (taskId) => {
        await axios.delete(`http://localhost:5000/tasks/${taskId}`)
        return taskId
    }
)

export const updateTask = createAsyncThunk('tasks/updateTask', async (data) => {
    const { taskId, ...option } = data
    await axios.patch(`http://localhost:5000/tasks/${taskId}`, option)
    return data
})

const tasksAdapter = createEntityAdapter()

export const {
    selectById: selectTaskById,
    selectIds: selectTaskIds,
    selectEntities: selectTasks,
    selectAll: selectAllTask,
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
        [updateTask.fulfilled]: (state, action) => {
            const { taskId, ...option } = action.payload
            state.entities[taskId] = { ...state.entities[taskId], ...option }
        },
    },
})

export default tasksSlice.reducer
