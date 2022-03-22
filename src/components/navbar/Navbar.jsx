import React, { useContext, useState } from 'react'
import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined'
import { DarkModeContext } from '../../context/darkModeContext'
import {
    Logout,
    LightMode,
    Fullscreen,
    NightlightOutlined,
    Diamond,
} from '@mui/icons-material'
import { useNavigate } from 'react-router-dom'
import Dialog from '../dialog/Dialog'

const Navbar = () => {
    const navigate = useNavigate()
    const { darkMode, dispatch } = useContext(DarkModeContext)
    const [fullScreenStatus, setFullScreenStatus] = useState(false)
    // const [openDialogAlert, setOpenDialogAlert] = useState(false)

    const handleFullScreen = () => {
        var elem = document.documentElement
        if (fullScreenStatus === false) {
            if (elem.requestFullscreen) {
                elem.requestFullscreen()
            } else if (elem.webkitRequestFullscreen) {
                elem.webkitRequestFullscreen()
            } else if (elem.msRequestFullscreen) {
                elem.msRequestFullscreen()
            }
        } else {
            if (document.exitFullscreen) {
                document.exitFullscreen()
            } else if (document.webkitExitFullscreen) {
                document.webkitExitFullscreen()
            } else if (document.msExitFullscreen) {
                document.msExitFullscreen()
            }
        }
        setFullScreenStatus(!fullScreenStatus)
    }

    // dialog

    const [openDialog, setOpenDialog] = useState(false)

    const handleClickOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="title">
                    <Diamond />
                    <span>مدیریت پروژه</span>
                </div>
                <div className="search">
                    <input type="text" placeholder="Search..." />
                    <SearchOutlinedIcon />
                </div>
                <div className="items">
                    <div className="item">
                        {darkMode ? (
                            <LightMode
                                className="icon"
                                onClick={() => dispatch({ type: 'TOGGLE' })}
                            />
                        ) : (
                            <NightlightOutlined
                                className="icon"
                                onClick={() => dispatch({ type: 'TOGGLE' })}
                            />
                        )}
                    </div>
                    <div className="item">
                        {!fullScreenStatus ? (
                            <Fullscreen
                                onClick={handleFullScreen}
                                className="icon"
                            />
                        ) : (
                            <FullscreenExitOutlinedIcon
                                onClick={handleFullScreen}
                                className="icon"
                            />
                        )}
                    </div>

                    <div className="item">
                        <Logout
                            className="icon"
                            onClick={handleClickOpenDialog}
                        />
                        <Dialog
                            open={openDialog}
                            handleClose={handleCloseDialog}
                            handleCloseNavigate={() => navigate('/login')}
                            title="آیا قصد خروج ار برنامه را دارید؟"
                            description="با این کار از برنامه خارج شده و به صفحه ' LOGIN ' هدایت می
                    شوید."
                        />
                        {/* <Dialog
                            open={openDialog}
                            keepMounted
                            onClose={handleClose}
                            aria-describedby="alert-dialog-slide-description"
                        >
                            <DialogTitle>
                                {"Use Google's location service?"}
                            </DialogTitle>
                            <DialogContent>
                                <DialogContentText id="alert-dialog-slide-description">
                                    Let Google help apps determine location.
                                    This means sending anonymous location data
                                    to Google, even when no apps are running.
                                </DialogContentText>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleClose}>Disagree</Button>
                                <Button onClick={() => navigate('/login')}>
                                    Agree
                                </Button>
                            </DialogActions>
                        </Dialog> */}
                    </div>
                    <div className="item">username</div>
                    <div className="item">
                        <img
                            src="https://dkstatics-public.digikala.com/digikala-reviews/b40c184030004b42a20e9462b183fbb06cd1364a_1632644979.jpg?x-oss-process=image/quality,q_70"
                            alt=""
                            className="avatar"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Navbar
