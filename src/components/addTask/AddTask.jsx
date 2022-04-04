import { useEffect, useState } from 'react'
// component
import Title from '../dashboardHeaderTitle/Title'
// material
import { LoadingButton } from '@mui/lab'
import { Box, Button, MenuItem, Select, TextField } from '@mui/material'
import { CancelRounded, LibraryAddRounded } from '@mui/icons-material'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
// redux
import {
    fetchProjects,
    selectAllProjects,
    selectProjects,
} from '../../redux/projectsSlice'
import { fetchUsers, selectUsersEntities } from '../../redux/usersSlice'
import {
    addNewTask,
    fetchTasks,
    selectTaskById,
    updateTask,
} from '../../redux/tasksSlice'
import { nanoid } from '@reduxjs/toolkit'
import { fetchLogin } from '../../redux/loginSlice'
// css
import './addTask.scss'

const AddTask = ({ pageTitle }) => {
    const dispatch = useDispatch()
    const { taskId: taskParamsId } = useParams()
    const navigate = useNavigate()

    // projects store
    const projectsStatus = useSelector((state) => state.projects.status)
    const allProjects = useSelector(selectAllProjects)
    const projectsEntities = useSelector(selectProjects)

    // users store
    const usersStatus = useSelector((state) => state.users.status)
    const usersEntities = useSelector(selectUsersEntities)

    // task store
    const taskStatus = useSelector((state) => state.tasks.status)
    const taskForEdit = useSelector((state) =>
        selectTaskById(state, taskParamsId)
    )

    // login store
    const loginStatus = useSelector((state) => state.login.status)
    const loginData = useSelector((state) => state.login.data)

    // local state
    const [title, setTitle] = useState('')
    const [taskCoefficient, setTaskCoefficient] = useState(1)
    const [taskProgress, setTaskProgress] = useState(0)
    const [projectId, setProjectId] = useState('')
    const [userId, setUserId] = useState('')
    const [taskPerformer, setTaskPerformer] = useState('')
    const [loading, setLoading] = useState(false)
    const [projectName, setProjectName] = useState('')

    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks())
        }

        if (taskParamsId && taskStatus === 'success') {
            setTitle(taskForEdit.title || '')
            setTaskCoefficient(taskForEdit.taskCoefficient || 1)
            setTaskProgress(taskForEdit.taskProgress || 0)
            setProjectId(taskForEdit.projectId || '')
            setTaskPerformer(taskForEdit.taskPerformer || '')
            setProjectName(taskForEdit.projectName || '')
            setUserId(taskForEdit.userId || '')
        }
    }, [dispatch, taskParamsId, taskStatus, taskForEdit])

    let usersForThisProject
    if (
        projectId &&
        projectsStatus === 'success' &&
        usersStatus === 'success'
    ) {
        const usersForThisProjectIds =
            projectsEntities[projectId].projectWorkersId

        usersForThisProject = usersForThisProjectIds.map(
            (userId) => usersEntities[userId]
        )

        console.log(usersForThisProjectIds)
        console.log(usersForThisProject)
    }

    // dispatch projects & data & login
    useEffect(() => {
        if (projectsStatus === 'idle') {
            dispatch(fetchProjects())
        }
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
        if (loginStatus === 'idle') {
            dispatch(fetchLogin())
        }
    }, [dispatch, loginStatus, projectsStatus, usersStatus])

    const sendTaskDataHandler = async () => {
        setLoading(true)
        const taskNanoId = nanoid()

        // save edited task
        if (taskParamsId) {
            dispatch(
                updateTask({
                    taskId: taskParamsId,
                    title,
                    taskCoefficient,
                    taskProgress,
                    projectId,
                    userId,
                    taskPerformer,
                    projectName,
                })
            )
        } else {
            // add new task
            await dispatch(
                addNewTask({
                    id: taskNanoId,
                    title,
                    taskCoefficient,
                    taskProgress,
                    projectId,
                    userId,
                    taskPerformer,
                    projectName,
                })
            )
        }
        setLoading(false)
        navigate('/tasks')
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

    // validate login user or admin
    let readOnly
    if (loginData && loginData.position && loginData.position === 'user') {
        readOnly = {
            readOnly: true,
            // disableUnderline: true,
        }
    }
    let selectDisable = false
    if (loginData && loginData.position && loginData.position === 'user') {
        selectDisable = true
    }

    return (
        <div className="addTask">
            <Title title={pageTitle} />
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
                            InputProps={readOnly}
                        />
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
                            InputProps={readOnly}
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
                            disabled={selectDisable}
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
                                disabled={selectDisable}
                            >
                                {usersForThisProject &&
                                    usersForThisProject.length > 0 &&
                                    usersForThisProject.map((user) => (
                                        <MenuItem value={user.id} key={user.id}>
                                            {`${user.name} ${user.lastName}`}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </div>
                    )}
                    <div className="formItemLogin">
                        <Box p={2}>
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
                        </Box>
                        <Button
                            size="large"
                            variant="outlined"
                            startIcon={<CancelRounded />}
                            onClick={() => navigate('/tasks')}
                        >
                            انصراف
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddTask
