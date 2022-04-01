import { useEffect } from 'react'
import './users.scss'
import Title from '../dashboardHeaderTitle/Title'
import UsersTable from '../datatable/UsersTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchUsers } from '../../redux/usersSlice'

const Users = () => {
    const dispatch = useDispatch()
    const usersStatus = useSelector((state) => state.users.status)

    useEffect(() => {
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [dispatch, usersStatus])
    return (
        <div className="usersList">
            <Title
                title="کارمندان"
                titleButton="افزودن کارمند جدید"
                titleButtonHref="/users/add-user"
            />
            <UsersTable />
        </div>
    )
}

export default Users
