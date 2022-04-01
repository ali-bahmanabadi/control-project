import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers, selectUsersEntities } from '../../redux/usersSlice'
import { LibraryAddRounded } from '@mui/icons-material'
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab'
import {
    Checkbox,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import AdapterJalali from '@date-io/date-fns-jalali'
import './addProjects.scss'
import {
    addNewProject,
    selectProjectById,
    updateProject,
} from '../../redux/projectsSlice'
import { useNavigate, useParams } from 'react-router-dom'

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

const AddProject = ({ pageTitle }) => {
    const navigate = useNavigate()
    const { projectId } = useParams()
    const dispatch = useDispatch()

    // users store 
    const usersStatus = useSelector((state) => state.users.status)
    const users = useSelector(selectUsersEntities)
    const usersId = Object.values(users).map((user) => user.id)

    // projects store 
    const projectData = useSelector((state) =>
        selectProjectById(state, projectId)
    )

    // local state 
    const [title, setTitle] = useState(projectData?.title || '')
    const [projectStart, setProjectStart] = useState(
        projectData?.projectStart || new Date()
    )
    const [projectFinish, setProjectFinish] = useState(
        projectData?.projectFinish || new Date()
    )
    const [projectWorkersId, setProjectWorkersId] = useState(
        projectData?.projectWorkersId || []
    )
    const [status, setStatus] = useState('idle')

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [dispatch, usersStatus])

    const sendNewProjectDataHandler = async () => {
        setStatus('pending')
        if (projectId) {
            await dispatch(
                updateProject({
                    projectId,
                    title,
                    projectStart,
                    projectFinish,
                    projectWorkersId,
                })
            )
            // window.location.reload(false)
            navigate('/projects')
        } else {
            await dispatch(
                addNewProject({
                    title,
                    projectStart,
                    projectFinish,
                    projectWorkersId,
                })
            )
        }

        setStatus('idle')
        setTitle('')
        setProjectStart(new Date())
        setProjectFinish(new Date())
        setProjectWorkersId([])
    }

    const handleSelectWorker = (event) => {
        const {
            target: { value },
        } = event
        setProjectWorkersId(
            typeof value === 'string' ? value.split(',') : value
        )
    }

    const canSave = () => {
        return (
            [title].every(Boolean) && status === 'idle'
            // && projectWorkersId.length > 0
        )
    }

    return (
        <div className="addProject">
            <div className="addProjectTitle">{pageTitle}</div>
            <div>
                <form>
                    <div className="formItemLogin">
                        <label>اسم پروژه: </label>
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
                        <label>تاریخ شروع پروژه: </label>
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                            <DatePicker
                                mask="____/__/__"
                                value={projectStart}
                                onChange={(newValue) =>
                                    setProjectStart(newValue)
                                }
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
                        <label>تاریخ پایان پروژه: </label>
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                            <DatePicker
                                mask="____/__/__"
                                value={projectFinish}
                                onChange={(newValue) =>
                                    setProjectFinish(newValue)
                                }
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
                    <div
                        className="formItemLogin"
                        style={{ overflow: 'hidden' }}
                    >
                        <label>کارمندان پروژه :</label>
                        <Select
                            className="loginField"
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={projectWorkersId}
                            onChange={handleSelectWorker}
                            color="primary"
                            renderValue={(selected) =>
                                selected
                                    .map(
                                        (userId) =>
                                            users[+userId]?.name +
                                            ' ' +
                                            users[userId]?.lastName
                                    )
                                    .join(' - ')
                            }
                            MenuProps={MenuProps}
                            style={{ overflow: 'hidden' }}
                        >
                            {usersId.map((userId) => (
                                <MenuItem key={userId} value={userId}>
                                    <Checkbox
                                        checked={
                                            projectWorkersId.indexOf(userId) >
                                            -1
                                        }
                                    />
                                    <ListItemText
                                        primary={
                                            users[+userId]?.name +
                                            ' ' +
                                            users[userId]?.lastName
                                        }
                                    />
                                </MenuItem>
                            ))}
                        </Select>
                    </div>
                    <div className="formItemLogin">
                        <LoadingButton
                            variant="contained"
                            startIcon={<LibraryAddRounded />}
                            size="large"
                            loadingPosition="start"
                            onClick={sendNewProjectDataHandler}
                            loading={status === 'pending'}
                            disabled={!canSave()}
                        >
                            ذخیره اطلاعات
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddProject
