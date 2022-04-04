import { useEffect, useState } from 'react'
import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, fetchUsers, selectAllUsers } from '../../redux/usersSlice'
import AlertDialog from '../dialog/Dialog'
import { AccountCircle, DeleteRounded, EditRounded } from '@mui/icons-material'
import { Button } from '@mui/material'

const UsersTable = () => {
    const dispatch = useDispatch()

    const usersStatus = useSelector((state) => state.users.status)
    const allUsers = useSelector(selectAllUsers)

    const userRows = Object.values(allUsers)

    const [dialogStatus, setDialogStatus] = useState(false)

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [dispatch, usersStatus])

    const handleDeleteUser = async () => {
        const userId = window.location.hash.substring(1)
        dispatch(deleteUser(userId))
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
                    <Link
                        to={`/users/${params.row.id}`}
                        state={params.row}
                        style={{ color: 'inherit' }}
                    >
                        <span className="profileCell">
                            <AccountCircle style={{ marginLeft: '10px' }} />
                            <span>{params.row.name}</span>
                        </span>
                    </Link>
                )
            },
        },
        { field: 'lastName', headerName: 'نام خانوادگی', width: 150 },
        { field: 'kodmelli', headerName: 'کدملی', width: 150 },
        {
            field: 'birthday',
            headerName: 'تاریخ تولد',
            width: 150,
            renderCell: (params) => {
                return (
                    <span>
                        {new Date(params.row.birthday).toLocaleDateString(
                            'fa-IR'
                        )}
                    </span>
                )
            },
        },
        { field: 'phone', headerName: 'شماره تلفن', width: 150 },
        {
            field: 'action',
            headerName: 'عملیات',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to={`/users/edit-user/${params.row.id}`}>
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<EditRounded />}
                            >
                                ویرایش
                            </Button>
                        </Link>
                        <Link
                            to={`/users#${params.row.id}`}
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
            {usersStatus === 'loading' && <div>درحال دریافت اطلاعات!</div>}
            {usersStatus === 'success' && userRows && userRows.length === 0 && (
                <div>در حال حاضر کاربری وجود ندارد!</div>
            )}
            {usersStatus === 'success' && userRows && userRows.length > 0 && (
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

export default UsersTable
