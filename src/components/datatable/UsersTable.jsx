import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
// import { userRows } from '../../datatablesource'
import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUsers, selectAllUsers } from '../../redux/usersSlice'
import AlertDialog from '../dialog/Dialog'

const UsersTable = () => {
    const dispatch = useDispatch()
    // const status = useSelector((state) => state.users.status)
    const allProjects = useSelector(selectAllUsers)

    const userRows = Object.values(allProjects)

    const [dialogStatus, setDialogStatus] = useState(false)

    // const [data, setData] = useState(userRows)
    // const handleDelete = (id) => {
    //     setData(data.filter((item) => item.id !== id))
    // }

    // useEffect(() => {
    //     if (status === 'idle') {
    //         dispatch(fetchUsers())
    //     }
    // }, [dispatch, status])

    const handleDeleteUser = async () => {
        const userId = window.location.hash.substring(1)
        if (userId) {
            await dispatch(deleteUser(userId))
            window.location.reload(false)
        }
        setDialogStatus(false)
    }

    const userColumns = [
        { field: 'range', headerName: 'ردیف', width: 70 },
        {
            field: 'name',
            headerName: 'نام',
            width: 150,
            renderCell: (params) => {
                return (
                    <Link to={`/users/${params.row.id}`} state={params.row}>
                        <div>
                            {/* <img
                                src={params.row.image}
                                alt=""
                                style={{ width: '30px' }}
                            /> */}
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
                        <Link
                            to={`/users#${params.row.id}`}
                            className="deleteButton"
                            onClick={() => setDialogStatus(true)}
                        >
                            حذف
                        </Link>
                        <AlertDialog
                            open={dialogStatus}
                            handleClose={() => setDialogStatus(false)}
                            handleCloseNavigate={handleDeleteUser}
                            title={`ایا میخواهید پروژه را حذف کنید؟`}
                            description="با این کار پروژه کامل حذف شده و قابل بازگردانی نیست !"
                        />
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
            />
        </div>
    )
}

export default UsersTable
