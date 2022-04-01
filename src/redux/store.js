import { configureStore } from '@reduxjs/toolkit'
import projectsSlice from './projectsSlice'
import tasksSlice from './tasksSlice'
import usersSlice from './usersSlice'

const store = configureStore({
    reducer: {
        projects: projectsSlice,
        users: usersSlice,
        tasks: tasksSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
