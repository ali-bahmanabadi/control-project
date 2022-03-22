import './users.scss'
import Title from '../dashboardHeaderTitle/Title'
import DataTable from '../datatable/DataTable'

const Users = () => {
    return (
        <div className="usersList">
            <Title
                title="کارمندان"
                titleButton="افزودن کارمند جدید"
                titleButtonHref="/users/add-user"
            />
            <DataTable />
        </div>
    )
}

export default Users
