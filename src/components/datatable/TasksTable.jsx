import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
// import { userRows } from '../../datatablesource'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteTask, fetchTasks, selectTasks } from '../../redux/tasksSlice'
import AlertDialog from '../dialog/Dialog'

// import store from '../../redux/store'

const TasksTable = () => {
    const dispatch = useDispatch()

    const [dialogStatus, setDialogStatus] = useState(false)

    // task store
    const taskStatus = useSelector((state) => state.tasks.status)

    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [dispatch, taskStatus])

    // -------------------------------------

    const allTasks = useSelector(selectTasks)

    const userRows = Object.values(allTasks)

    const [data, setData] = useState(userRows)

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
        { field: 'taskProgress', headerName: 'درصد پیشرفت', width: 140 },
        {
            field: 'action',
            headerName: 'عملیات',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/tasks/edit-task/${params.row.id}`}>
                            <div className="viewButton">ویرایش</div>
                        </Link>
                        <Link
                            to={`/tasks#${params.row.id}`}
                            className="deleteButton"
                            onClick={() => setDialogStatus(true)}
                        >
                            حذف
                        </Link>
                        <AlertDialog
                            open={dialogStatus}
                            handleClose={() => setDialogStatus(false)}
                            handleCloseNavigate={handleDeleteTask}
                            title={`ایا میخواهید وظیفه را حذف کنید؟`}
                            description="با این کار وظیفه کامل حذف شده و قابل بازگردانی نیست !"
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <div className="datatable">
            {taskStatus === 'loading' && <div>درحال دریافت اطلاعات!</div>}
            {taskStatus === 'success' && (
                <DataGrid
                    className="datagrid"
                    rows={userRows}
                    columns={userColumns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                />
            )}
        </div>
    )
}

export default TasksTable
