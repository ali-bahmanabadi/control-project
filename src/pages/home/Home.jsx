// components
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Dashboard from './dashboard/Dashboard'
import AddUser from '../../components/addUser/AddUser'
import AddProject from '../../components/addProject/AddProject'
import Profile from '../../components/profile/Profile'
import AddTask from '../../components/addTask/AddTask'
import Projects from '../../components/list/Projects'
import Users from '../../components/list/Users'
import Tasks from '../../components/list/Tasks'
// router
import { Route, Routes } from 'react-router-dom'
// css
import './home.scss'

const Home = () => {
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="main">
                    <Routes>
                        <Route path="/">
                            <Route index element={<Dashboard />} />
                            {/* project page  */}
                            <Route path="projects">
                                <Route index element={<Projects />} />
                                <Route
                                    path="add-project"
                                    element={
                                        <AddProject pageTitle="افزورن پروژه جدید" />
                                    }
                                />
                                <Route
                                    path="edit-project/:projectId"
                                    element={
                                        <AddProject pageTitle="ویرایش پروژه" />
                                    }
                                />
                            </Route>
                            {/* user page  */}
                            <Route path="users">
                                <Route index element={<Users />} />
                                <Route
                                    path="add-user"
                                    element={
                                        <AddUser title="افزودن کاربر جدید" />
                                    }
                                />
                                <Route path=":userId" element={<Profile />} />
                                <Route
                                    path="edit-user/:userId"
                                    element={
                                        <AddUser title="ویرایش اطلاعات کاربر" />
                                    }
                                />
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
                            {/* task page  */}
                            <Route path="tasks">
                                <Route index element={<Tasks />} />
                                <Route path="add-task" element={<AddTask />} />
                                <Route
                                    path="edit-task/:taskId"
                                    element={<AddTask />}
                                />
                            </Route>
                        </Route>
                    </Routes>
                </div>
            </div>
        </div>
    )
}

export default Home
