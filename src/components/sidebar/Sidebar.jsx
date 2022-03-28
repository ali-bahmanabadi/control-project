import './sidebar.scss'
import { useNavigate } from 'react-router-dom'
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
import Dialog from '../dialog/Dialog'
import { useState } from 'react'

const Sidebar = () => {
    const navigate = useNavigate()
    const [openDialog, setOpenDialog] = useState(false)

    const handleClickOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    return (
        <div className="sidebar">
            <div className="center">
                <List>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/')}>
                            <ListItemIcon>
                                <HomeRounded />
                            </ListItemIcon>
                            <ListItemText primary="صفحه اصلی" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/users')}>
                            <ListItemIcon>
                                <PeopleAltRounded />
                            </ListItemIcon>
                            <ListItemText primary="کارمندان" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/projects')}>
                            <ListItemIcon>
                                <TaskAltRounded />
                            </ListItemIcon>
                            <ListItemText primary="پروژه ها" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/tasks')}>
                            <ListItemIcon>
                                <AssignmentIndRounded />
                            </ListItemIcon>
                            <ListItemText primary="وظایف" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={() => navigate('/profile')}>
                            <ListItemIcon>
                                <PersonRounded />
                            </ListItemIcon>
                            <ListItemText primary="پروفایل" />
                        </ListItemButton>
                    </ListItem>
                    <ListItem disablePadding>
                        <ListItemButton onClick={handleClickOpenDialog}>
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
