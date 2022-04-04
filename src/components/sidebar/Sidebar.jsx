import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../../redux/loginSlice'
import Dialog from '../dialog/Dialog'
import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from '@mui/material'
import {
    AssignmentIndRounded,
    HomeRounded,
    Logout,
    PeopleAltRounded,
    PersonRounded,
    TaskAltRounded,
} from '@mui/icons-material'

import './sidebar.scss'

const Sidebar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const selectInit = localStorage.getItem('select')

    // local state
    const [openDialog, setOpenDialog] = useState(false)
    const [selectedIndex, setSelectedIndex] = useState(+selectInit || 1)

    // login store
    const loginStatus = useSelector((state) => state.login.status)
    const loginData = useSelector((state) => state.login.data)

    useEffect(() => {
        if (loginStatus === 'idle') {
            dispatch(fetchLogin())
        }
        if (loginStatus === 'success') {
            if (loginData.position === 'user') {
                setSelectedIndex(4)
            }
        }
    }, [dispatch, loginStatus, loginData])

    const handleClickOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    const homePageHandle = () => {
        setSelectedIndex(1)
        navigate('/dashboard')
        localStorage.setItem('select', 1)
    }

    const usersHandle = () => {
        setSelectedIndex(2)
        navigate('/users')
        localStorage.setItem('select', 2)
    }

    const projectsHandle = () => {
        setSelectedIndex(3)
        navigate('/projects')
        localStorage.setItem('select', 3)
    }

    const tasksHandle = () => {
        setSelectedIndex(4)
        navigate('/tasks')
        localStorage.setItem('select', 4)
    }

    const profileHandle = () => {
        setSelectedIndex(5)
        navigate('/profile')
        localStorage.setItem('select', 5)
    }
    return (
        <div className="sidebar">
            <div className="center">
                <List>
                    {loginData &&
                        loginData.position &&
                        loginData.position === 'admin' && (
                            <>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        style={{ borderRadius: 10 }}
                                        selected={selectedIndex === 1}
                                        onClick={homePageHandle}
                                    >
                                        <ListItemIcon>
                                            <HomeRounded />
                                        </ListItemIcon>
                                        <ListItemText primary="صفحه اصلی" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        style={{ borderRadius: 10 }}
                                        selected={selectedIndex === 2}
                                        onClick={usersHandle}
                                    >
                                        <ListItemIcon>
                                            <PeopleAltRounded />
                                        </ListItemIcon>
                                        <ListItemText primary="کارمندان" />
                                    </ListItemButton>
                                </ListItem>
                                <ListItem disablePadding>
                                    <ListItemButton
                                        style={{ borderRadius: 10 }}
                                        selected={selectedIndex === 3}
                                        onClick={projectsHandle}
                                    >
                                        <ListItemIcon>
                                            <TaskAltRounded />
                                        </ListItemIcon>
                                        <ListItemText primary="پروژه ها" />
                                    </ListItemButton>
                                </ListItem>
                            </>
                        )}

                    <ListItem disablePadding>
                        <ListItemButton
                            style={{ borderRadius: 10 }}
                            selected={selectedIndex === 4}
                            onClick={tasksHandle}
                        >
                            <ListItemIcon>
                                <AssignmentIndRounded />
                            </ListItemIcon>
                            <ListItemText primary="وظایف" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            style={{ borderRadius: 10 }}
                            selected={selectedIndex === 5}
                            onClick={profileHandle}
                        >
                            <ListItemIcon>
                                <PersonRounded />
                            </ListItemIcon>
                            <ListItemText primary="پروفایل" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton
                            style={{ borderRadius: 10 }}
                            onClick={handleClickOpenDialog}
                        >
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="خروج" />
                        </ListItemButton>
                    </ListItem>
                </List>
                <Dialog
                    open={openDialog}
                    handleClose={handleCloseDialog}
                    handleCloseNavigate={() => navigate('/login')}
                    title="آیا قصد خروج ار برنامه را دارید؟"
                    description="با این کار از برنامه خارج شده و به صفحه ' LOGIN ' هدایت می
                    شوید."
                />
            </div>
        </div>
    )
}

export default Sidebar
