import { useEffect, useState } from 'react'
// component
import Title from '../dashboardHeaderTitle/Title'
// material
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab'
import { MenuItem, Select, TextField } from '@mui/material'
import AdapterJalali from '@date-io/date-fns-jalali'
// css
import './addTask.scss'
import { LibraryAddRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import {
    addTaskIdToProject,
    fetchProjects,
    selectAllProjects,
    selectProjects,
} from '../../redux/projectsSlice'
import {
    fetchUsers,
    selectAllUsers,
    selectUsersEntities,
} from '../../redux/usersSlice'
import { addNewTask } from '../../redux/tasksSlice'
import { nanoid } from '@reduxjs/toolkit'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const AddTask = () => {
    const dispatch = useDispatch()
    // projects store
    const projectsStatus = useSelector((state) => state.projects.status)
    const allProjects = useSelector(selectAllProjects)
    const projectsEntities = useSelector(selectProjects)

    // users store
    const usersStatus = useSelector((state) => state.users.status)
    const allUsers = useSelector(selectAllUsers)
    const usersEntities = useSelector(selectUsersEntities)

    // task store

    // local state
    const [title, setTitle] = useState('')
    const [taskStart, setTaskStart] = useState(new Date())
    const [taskFinish, setTaskFinish] = useState(new Date())
    const [taskCoefficient, setTaskCoefficient] = useState(1)
    const [taskProgress, setTaskProgress] = useState(0)
    const [projectId, setProjectId] = useState('')
    const [userId, setUserId] = useState('')
    const [taskPerformer, setTaskPerformer] = useState('')
    const [projectName, setProjectName] = useState('')

    useEffect(() => {}, [])

    let usersForThisProject
    if (projectId) {
        const usersForThisProjectIds =
            projectsEntities[projectId].projectWorkersId

        usersForThisProject = usersForThisProjectIds.map(
            (userId) => usersEntities[userId]
        )
        console.log(usersForThisProject)
    }

    // dispatch projects & data
    useEffect(() => {
        if (projectsStatus === 'idle') {
            dispatch(fetchProjects())
        }
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [dispatch, projectsStatus, usersStatus])

    const [loading, setLoading] = useState(false)

    const sendTaskDataHandler = async () => {
        setLoading(true)
        const taskId = nanoid()

        // add new task
        await dispatch(
            addNewTask({
                id: taskId,
                title,
                taskStart: taskStart.toLocaleDateString('fa-IR'),
                taskFinish: taskFinish.toLocaleDateString('fa-IR'),
                taskCoefficient,
                taskProgress,
                projectId,
                userId,
                taskPerformer,
                projectName,
            })
        )
        const newProjectTask = [
            ...projectsEntities[projectId]?.projectTasksId,
            taskId,
        ]
        await dispatch(
            addTaskIdToProject({
                projectId,
                projectTasksId: newProjectTask,
            })
        )
        console.log(newProjectTask)
        setLoading(false)
    }

    const handleUserId = (e) => {
        const id = e.target.value
        setUserId(id)
        const userFullName =
            usersEntities[id].name + ' ' + usersEntities[id].lastName
        setTaskPerformer(userFullName)
        console.log(userFullName)
    }

    const handleProjectId = (e) => {
        const id = e.target.value
        setProjectId(id)
        const projectTitle = projectsEntities[id]?.title
        setProjectName(projectTitle)
        console.log(projectTitle)
    }

    return (
        <div className="addTask">
            <Title title="افزودن وظیفه جدید" />
            <div className="addTaskWrapper">
                <form>
                    <div className="formItemLogin">
                        <label>اسم: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="اسم"
                            size="small"
                            className="loginField"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>تاریخ شروع: </label>
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                            <DatePicker
                                mask="____/__/__"
                                value={taskStart}
                                onChange={(newValue) => setTaskStart(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="loginField"
                                    />
                                )}
                                size="small"
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="formItemLogin">
                        <label>تاریخ پایان: </label>
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                            <DatePicker
                                mask="____/__/__"
                                value={taskFinish}
                                onChange={(newValue) => setTaskFinish(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        className="loginField"
                                    />
                                )}
                                size="small"
                            />
                        </LocalizationProvider>
                    </div>
                    <div className="formItemLogin">
                        <label>ضریب: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="عدد سختی پروزه را وارد کنید"
                            size="small"
                            className="loginField"
                            type="number"
                            value={taskCoefficient}
                            onChange={(e) => setTaskCoefficient(e.target.value)}
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>درصد پیشرفت: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="درصد پیشرفت پروژه بین 0 تا 100 را وارد کنید"
                            size="small"
                            className="loginField"
                            type="number"
                            value={taskProgress}
                            onChange={(e) => setTaskProgress(e.target.value)}
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>پروژه مربوطه:</label>
                        <Select
                            className="loginField"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={projectId}
                            onChange={handleProjectId}
                            size="small"
                        >
                            {allProjects &&
                                projectsStatus === 'success' &&
                                allProjects.map((project) => (
                                    <MenuItem
                                        key={project.id}
                                        value={project.id}
                                    >
                                        {project.title}
                                    </MenuItem>
                                ))}
                        </Select>
                    </div>
                    {projectId && (
                        <div className="formItemLogin">
                            <label>انجام دهنده:</label>
                            <Select
                                className="loginField"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userId}
                                onChange={handleUserId}
                                size="small"
                            >
                                {usersForThisProject &&
                                    usersForThisProject.length > 0 &&
                                    usersForThisProject.map((user) => (
                                        <MenuItem
                                            value={user.id}
                                            key={user.id}
                                        >{`${user.name} ${user.lastName}`}</MenuItem>
                                    ))}
                            </Select>
                        </div>
                    )}
                    <div className="formItemLogin">
                        <LoadingButton
                            variant="contained"
                            startIcon={<LibraryAddRounded />}
                            size="large"
                            loadingPosition="start"
                            onClick={sendTaskDataHandler}
                            loading={loading}
                        >
                            ذخیره اطلاعات
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask
