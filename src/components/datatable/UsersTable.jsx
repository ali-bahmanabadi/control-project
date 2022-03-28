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

const UsersTable = () => {
    const navigate = useNavigate()
    const allProjects = useSelector((state) => state.users.entities)

    const userRows = Object.values(allProjects)

    const [data, setData] = useState(userRows)
    const handleDelete = (id) => {
        setData(data.filter((item) => item.id !== id))
    }
    const userColumns = [
        { field: 'range', headerName: 'ردیف', width: 70 },
        {
            field: 'name',
            headerName: 'نام',
            width: 150,
            renderCell: (params) => {
                return (
                    <Link to={`/users/${params.row.id}`}>
                        <div>
                            <img
                                src={params.row.image}
                                alt=""
                                style={{ width: '30px' }}
                            />
                            <span>{params.row.name}</span>
                        </div>
                    </Link>
                )
            },
        },
        { field: 'lastName', headerName: 'نام خانوادگی', width: 150 },
        { field: 'kodmelli', headerName: 'کدملی', width: 150 },
        { field: 'birthday', headerName: 'تاریخ تولد', width: 150 },
        { field: 'phone', headerName: 'شماره تلفن', width: 150 },
        { field: 'email', headerName: 'ایمیل', width: 150 },
        {
            field: 'action',
            headerName: 'عملیات',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/users/edit-user/${params.row.id}`}>
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

export default UsersTable
