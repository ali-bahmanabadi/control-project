import {
    createAsyncThunk,
    createSlice,
    createEntityAdapter,
} from '@reduxjs/toolkit'
import axios from 'axios'
import { client } from '../api/client'

export const fetchProjects = createAsyncThunk(
    'projects/fetchProjects',
    async () => {
        return await client.get('http://localhost:5000/projects')
    }
)

export const addNewProject = createAsyncThunk(
    'projects/newProjects',
    async (newProjectData) => {
        return await client.post(
            'http://localhost:5000/projects',
            newProjectData
        )
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (projectId) => {
        return await axios.delete(`http://localhost:5000/projects/${projectId}`)
    }
)

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async (data) => {
        const { projectId, ...option } = data
        return await axios.patch(
            `http://localhost:5000/projects/${projectId}`,
            option
        )
    }
)

export const addTaskIdToProject = createAsyncThunk(
    'projects/addTaskIdToProject',
    async (data) => {
        const { projectId, ...option } = data
        console.log(option)
        return await axios.patch(
            `http://localhost:5000/projects/${projectId}`,
            option
        )
    }
)

const projectsAdapter = createEntityAdapter()

export const {
    selectById: selectProjectById,
    selectIds: selectProjectIds,
    selectEntities: selectProjects,
    selectAll: selectAllProjects,
} = projectsAdapter.getSelectors((state) => state.projects)

const initialState = projectsAdapter.getInitialState({
    status: 'idle',
    error: null,
})

const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {},
    extraReducers: {
        [fetchProjects.pending]: (state) => {
            state.status = 'loading'
        },
        [fetchProjects.fulfilled]: (state, action) => {
            projectsAdapter.upsertMany(state, action.payload)
            state.status = 'success'
        },
        [fetchProjects.rejected]: (state, action) => {
            state.status = 'error'
            state.error = action.payload
        },
        [addNewProject.fulfilled]: projectsAdapter.addOne,
        [deleteProject.fulfilled]: projectsAdapter.removeOne,
        [updateProject.fulfilled]: projectsAdapter.updateOne,
        [addTaskIdToProject.fulfilled]: projectsAdapter.updateOne,
    },
})

export default projectsSlice.reducer
