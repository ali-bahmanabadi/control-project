import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, fetchTasks, selectAllTask } from '../../redux/tasksSlice'
import { fetchLogin } from '../../redux/loginSlice'
import AlertDialog from '../dialog/Dialog'
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
import './datatable.scss'

const TasksTable = () => {
    const dispatch = useDispatch()

    const [dialogStatus, setDialogStatus] = useState(false)

    // task store
    const taskStatus = useSelector((state) => state.tasks.status)
    const allTasks = useSelector(selectAllTask)

    // login store
    const loginStatus = useSelector((state) => state.login.status)
    const loginData = useSelector((state) => state.login.data)

    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks())
        }
        if (loginStatus === 'idle') {
            dispatch(fetchLogin())
        }
    }, [dispatch, loginStatus, taskStatus])

    // -------------------------------------

    const userRows = [...allTasks]

    let taskForRender = userRows
    if (
        taskStatus === 'success' &&
        loginStatus === 'success' &&
        loginData.userId !== ''
    ) {
        taskForRender = userRows.filter(
            (task) => task.userId === loginData.userId
        )
    }

    // console.log(typeof loginData.userId)

    const handleDeleteTask = async () => {
        const taskId = window.location.hash.substring(1)
        await dispatch(deleteTask(taskId))
        setDialogStatus(false)
    }

    const userColumns = [
        { field: 'range', headerName: 'ردیف', width: 50 },
        { field: 'title', headerName: 'نام وظیفه', width: 140 },
        { field: 'taskPerformer', headerName: 'انجام دهنده', width: 140 },
        { field: 'projectName', headerName: 'پروژه مربوطه', width: 140 },
        { field: 'taskCoefficient', headerName: 'ضریب', width: 140 },
        {
            field: 'taskProgress',
            headerName: 'درصد پیشرفت',
            width: 140,
            renderCell: (params) => {
                return <span>{params.row.taskProgress}%</span>
            },
        },
        {
            field: 'action',
            headerName: 'عملیات',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/tasks/edit-task/${params.row.id}`}>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<EditRounded />}
                            >
                                ویرایش
                            </Button>
                        </Link>
                        {loginData &&
                            loginData.position &&
                            loginData.position === 'admin' && (
                                <Link
                                    to={`/tasks#${params.row.id}`}
                                    onClick={() => setDialogStatus(true)}
                                >
                                    <Button
                                        variant="outlined"
                                        color="error"
                                        size="small"
                                        startIcon={<DeleteRounded />}
                                    >
                                        حذف
                                    </Button>
                                </Link>
                            )}
                    </div>
                )
            },
        },
    ]

    return (
        <div className="datatable">
            {taskStatus === 'loading' && <div>درحال دریافت اطلاعات!</div>}
            {taskStatus === 'success' &&
                taskForRender &&
                taskForRender.length === 0 && (
                    <div>درحال حاضر وظیفه ای وجودندارد!</div>
                )}
            {taskStatus === 'success' &&
                taskForRender &&
                taskForRender.length !== 0 && (
                    <DataGrid
                        className="datagrid"
                        rows={taskForRender}
                        columns={userColumns}
                        pageSize={8}
                        rowsPerPageOptions={[8]}
                    />
                )}
            <AlertDialog
                open={dialogStatus}
                handleClose={() => setDialogStatus(false)}
                handleCloseNavigate={handleDeleteTask}
                title={`آیا میخواهید وظیفه را حذف کنید؟`}
                description="با این کار وظیفه کامل حذف شده و قابل بازگردانی نیست !"
            />
        </div>
    )
}

export default TasksTable
