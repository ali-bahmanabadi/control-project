import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import './home.scss'
import { Route, Routes } from 'react-router-dom'
import Dashboard from './dashboard/Dashboard'
import List from '../list/List'
import Datatable from '../../components/datatable/Datatable'
import AddUser from '../../components/addUser/AddUser'
import Projects from '../../components/projects/Projects'
import AddProject from '../../components/addProject/AddProject'
import Profile from '../../components/profile/Profile'

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <Routes>
                    <Route path="/">
                        <Route index element={<Dashboard />} />
                        {/* projects page  */}
                        <Route path="projects">
                            <Route index element={<Projects />} />
                            <Route
                                path="add-project"
                                element={<AddProject />}
                            />
                        </Route>
                        {/* users pages  */}
                        <Route path="users">
                            <Route index element={<Datatable />} />
                            <Route path="add-user" element={<AddUser />} />
                        </Route>
                        {/* profile page  */}
                        <Route path="profile">
                            <Route index element={<Profile />} />
                            <Route
                                path="edit-profile"
                                element={
                                    <AddUser title="ویرایش اطلاعات کاربر" />
                                }
                            />
                        </Route>
                    </Route>
                </Routes>
            </div>
        </div>
    )
}

export default Home
