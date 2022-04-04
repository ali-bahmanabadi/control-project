import * as React from 'react'
import { fetchLogin } from '../../redux/loginSlice'
// components
import Sidebar from '../../components/sidebar/Sidebar'
import Navbar from '../../components/navbar/Navbar'
import Dashboard from './dashboard/Dashboard'
import AddUser from '../../components/addUser/AddUser'
import AddProject from '../../components/addProject/AddProject'
import AddTask from '../../components/addTask/AddTask'
// router
import { Navigate, Route, Routes } from 'react-router-dom'
//redux
import { useDispatch, useSelector } from 'react-redux'
// css
import './home.scss'
import Projects from './projects/Projects'
import Tasks from './tasks/Tasks'
import Users from './users/Users'
import Profile from './profile/Profile'

const Home = () => {
    const dispatch = useDispatch()

    const loginStatus = useSelector((state) => state.login.status)
    const loginData = useSelector((state) => state.login.data)

    React.useEffect(() => {
        if (loginStatus === 'idle') {
            dispatch(fetchLogin())
        }
    }, [dispatch, loginStatus])

    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="main">
                    <div className="container">
                        <Routes>
                            <Route path="/">
                                <Route
                                    index
                                    element={<Navigate to="/login" replace />}
                                />
                                {loginData &&
                                    loginData.position &&
                                    loginData.position === 'admin' && (
                                        <>
                                            <Route
                                                path="dashboard"
                                                element={<Dashboard />}
                                            />
                                            {/* project page  */}
                                            <Route path="projects">
                                                <Route
                                                    index
                                                    element={<Projects />}
                                                />
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
                                                <Route
                                                    index
                                                    element={<Users />}
                                                />
                                                <Route
                                                    path="add-user"
                                                    element={
                                                        <AddUser title="افزودن کاربر جدید" />
                                                    }
                                                />
                                                <Route
                                                    path=":userId"
                                                    element={<Profile />}
                                                />
                                                <Route
                                                    path="edit-user/:userId"
                                                    element={
                                                        <AddUser title="ویرایش اطلاعات کاربر" />
                                                    }
                                                />
                                            </Route>
                                        </>
                                    )}
                                {/* task page  */}
                                <Route path="tasks">
                                    <Route index element={<Tasks />} />
                                    {loginData &&
                                        loginData.position &&
                                        loginData.position === 'admin' && (
                                            <Route
                                                path="add-task"
                                                element={
                                                    <AddTask pageTitle="افزودن وظیفه جدید" />
                                                }
                                            />
                                        )}

                                    <Route
                                        path="edit-task/:taskId"
                                        element={
                                            <AddTask pageTitle="ویرایش وظیفه" />
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
                            </Route>
                        </Routes>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Home
