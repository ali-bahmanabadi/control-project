import { configureStore } from '@reduxjs/toolkit'
import loginSlice from './loginSlice'
import projectsSlice from './projectsSlice'
import tasksSlice from './tasksSlice'
import usersSlice from './usersSlice'

const store = configureStore({
    reducer: {
        projects: projectsSlice,
        users: usersSlice,
        tasks: tasksSlice,
        login: loginSlice,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export default store
