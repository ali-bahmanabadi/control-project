import './sidebar.scss'
import { Link, useNavigate } from 'react-router-dom'
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

const Sidebar = () => {
    const navigate = useNavigate()
    return (
        <div className="sidebar">
            <div className="top">
                <Link to="/" style={{ textDecoration: 'none' }}>
                    <span className="logo">Control Project</span>
                </Link>
            </div>
            <hr />
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
                        <ListItemButton onClick={() => navigate('/task')}>
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
                        <ListItemButton onClick={() => navigate('/login')}>
                            <ListItemIcon>
                                <Logout />
                            </ListItemIcon>
                            <ListItemText primary="خروج" />
                        </ListItemButton>
                    </ListItem>
                </List>
            </div>
        </div>
    )
}

export default Sidebar
