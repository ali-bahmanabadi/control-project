import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
// import { userRows } from '../../datatablesource'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useSelector } from 'react-redux'
import {
    selectProjectById,
    selectProjects,
    selectProjectIds,
} from '../../redux/projectsSlice'
import store from '../../redux/store'

const userColumns = [
    { field: 'range', headerName: 'ردیف', width: 70 },
    { field: 'title', headerName: 'اسم پروژه', width: 150 },
    { field: 'startProject', headerName: 'تاریخ شروع پروژه', width: 150 },
    { field: 'finishProject', headerName: 'تاریخ پایان پروژه', width: 150 },
    { field: 'numberOfWorker', headerName: 'تعداد کارمندان پروژه', width: 150 },
    { field: 'projectProgress', headerName: 'پیشرفت پروژه', width: 150 },
]

const ProjectsTable = () => {
    const allProjects = useSelector((state) => state.projects.entities)

    const userRows = Object.values(allProjects)

    const [data, setData] = useState(userRows)
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id))
    }

    const actionColumn = [
        {
            field: 'action',
            headerName: 'عملیات',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link
                            to="/users/test"
                            style={{ textDecoration: 'none' }}
                        >
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
                columns={userColumns.concat(actionColumn)}
                pageSize={8}
                rowsPerPageOptions={[8]}
                checkboxSelection
            />
        </div>
    )
}

export default ProjectsTable
