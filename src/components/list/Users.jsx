import './users.scss'
import Title from '../dashboardHeaderTitle/Title'
import Projects from '../datatable/DataTable'
import UsersTable from '../datatable/UsersTable'

const Users = () => {
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
