import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import { client } from '../api/client'

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        return await client.get('projects')
    }
)

const projectsAdapter = createEntityAdapter()

export const {
    selectById: selectProjectById,
    selectIds: selectProjectIds,
    selectEntities: selectProjects,
} = projectsAdapter.getSelectors((state) => state.projects)

const initialState = projectsAdapter.getInitialState({
    status: 'idle',
})

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProjects.pending]: (state, action) => {
            state.status = 'loading'
        },
        [fetchProjects.fulfilled]: (state, action) => {
            projectsAdapter.upsertMany(state, action.payload)
            state.status = 'idle'
        },
        [fetchProjects.rejected]: (state, action) => {
            state.status = 'idle'
            console.log(action.payload)
        },
    },
})

export default projectsSlice.reducer
