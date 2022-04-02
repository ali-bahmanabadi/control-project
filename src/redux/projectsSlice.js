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
        const response = await axios.get('http://localhost:5000/projects')
        return response.data
    }
)

export const addNewProject = createAsyncThunk(
    'projects/newProjects',
    async (newProjectData) => {
        await axios.post('http://localhost:5000/projects', newProjectData)
        return newProjectData
    }
)

export const deleteProject = createAsyncThunk(
    'projects/deleteProject',
    async (projectId) => {
        await axios.delete(`http://localhost:5000/projects/${projectId}`)
        return projectId
    }
)

export const updateProject = createAsyncThunk(
    'projects/updateProject',
    async (data) => {
        const { projectId, ...option } = data
        await axios.patch(`http://localhost:5000/projects/${projectId}`, option)
        return data
    }
)

export const addTaskIdToProject = createAsyncThunk(
    'projects/addTaskIdToProject',
    async (data) => {
        const { projectId, newTaskId, ...option } = data
        console.log(option)
        await axios.patch(`http://localhost:5000/projects/${projectId}`, option)
        return data
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
        [updateProject.fulfilled]: (state, action) => {
            const { projectId, ...data } = action.payload
            state.entities[projectId] = {
                ...state.entities[projectId],
                ...data,
            }
        },
        [addTaskIdToProject.fulfilled]: (state, action) => {
            const { projectId, projectTasksId } = action.payload
            console.log(projectTasksId)
            state.entities[projectId].projectTasksId.push(...projectTasksId)
        },
    },
})

export default projectsSlice.reducer
