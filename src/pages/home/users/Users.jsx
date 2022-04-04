import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../../components/dashboardHeaderTitle/Title'
import UsersTable from '../../../components/datatable/UsersTable'
import { fetchUsers } from '../../../redux/usersSlice'
import './users.scss'

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
