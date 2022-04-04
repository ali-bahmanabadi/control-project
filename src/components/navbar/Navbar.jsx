import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined'
import { Logout, Fullscreen, Diamond } from '@mui/icons-material'
import Dialog from '../dialog/Dialog'
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin } from '../../redux/loginSlice'
import { fetchUsers, selectUserById } from '../../redux/usersSlice'
import './navbar.scss'

const Navbar = () => {
    const dispatchRedux = useDispatch()
    const navigate = useNavigate()

    // login store
    const loginStatus = useSelector((state) => state.login.status)
    const loginData = useSelector((state) => state.login.data)

    // user store
    const usersStatus = useSelector((state) => state.users.status)
    const userById = useSelector((state) =>
        selectUserById(state, loginData?.userId)
    )

    const [fullScreenStatus, setFullScreenStatus] = useState(false)

    useEffect(() => {
        if (loginStatus === 'idle') {
            dispatchRedux(fetchLogin())
        }
        if (loginData && usersStatus === 'idle' && loginData.userId != null) {
            dispatchRedux(fetchUsers())
        }
    }, [dispatchRedux, loginData, loginStatus, usersStatus])

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

    // set username
    let username
    if (loginData && loginData.position && loginData.position === 'admin') {
        username =
            loginData.name || loginData.lastName
                ? loginData.name + ' ' + loginData.lastName
                : 'مدیریت'
    } else if (
        loginData &&
        loginData.position &&
        loginData.position === 'user'
    ) {
        username =
            userById && (userById.name || userById.lastName)
                ? userById.name + ' ' + userById.lastName
                : 'کاربر'
    }

    return (
        <div className="navbar">
            <div className="wrapper">
                <div className="title">
                    <Diamond />
                    <span>مدیریت پروژه</span>
                </div>
                <div className="items">
                    <div className="item"></div>
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
                    </div>
                    <div className="item">{username}</div>
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
