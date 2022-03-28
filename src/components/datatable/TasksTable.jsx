import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
// import { userRows } from '../../datatablesource'
import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    selectProjectById,
    selectProjects,
    selectProjectIds,
} from '../../redux/projectsSlice'
import store from '../../redux/store'

const TasksTable = () => {
    const navigate = useNavigate()
    const allProjects = useSelector((state) => state.tasks.entities)

    const userRows = Object.values(allProjects)

    const [data, setData] = useState(userRows)
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id))
    }
    const userColumns = [
        { field: 'range', headerName: 'ردیف', width: 50 },
        { field: 'title', headerName: 'نام وظیفه', width: 140 },
        { field: 'startProject', headerName: 'تاریخ شروع', width: 140 },
        { field: 'finishProject', headerName: 'تاریخ پایان', width: 140 },
        { field: 'coefficient', headerName: 'ضریب', width: 140 },
        { field: 'projectProgress', headerName: 'درصد پیشرفت', width: 140 },
        { field: 'taskManager', headerName: 'انجام دهنده', width: 140 },
        { field: 'headerProject', headerName: 'پروژه مربوطه', width: 140 },
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
                        <div
                            className="deleteButton"
                            onClick={() => handleDelete(params.row.id)}
                        >
                            حذف
                        </div>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="datatable">
            {}
            <DataGrid
                className="datagrid"
                rows={userRows}
                columns={userColumns}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
        </div>
    )
}

export default TasksTable
