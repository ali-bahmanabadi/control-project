import { useContext, useState } from 'react'
import './navbar.scss'
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined'
import FullscreenExitOutlinedIcon from '@mui/icons-material/FullscreenExitOutlined'
import { DarkModeContext } from '../../context/darkModeContext'
import {
    Logout,
    LightMode,
    Fullscreen,
    NightlightOutlined,
} from '@mui/icons-material'
import { Link } from 'react-router-dom'
import Dialog from '../dialog/Dialog'

const Navbar = () => {
    const { darkMode, dispatch } = useContext(DarkModeContext)
    const [fullScreenStatus, setFullScreenStatus] = useState(false)
    const [openDialogAlert, setOpenDialogAlert] = useState(false)

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

    return (
        <div className="navbar">
            <div className="wrapper">
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
                    {/* <div className="item">
                        <NotificationsNoneOutlinedIcon className="icon" />
                        <div className="counter">1</div>
                    </div> */}
                    {/* <div className="item">
                        <ChatBubbleOutlineOutlinedIcon className="icon" />
                        <div className="counter">2</div>
                    </div> */}
                    <div className="item">
                        {/* <Dialog
                            button={<Logout className="icon" />}
                            onClick={() => setOpenDialogAlert(!openDialogAlert)}
                            close={() => setOpenDialogAlert(false)}
                            open={openDialogAlert}
                        /> */}
                        <Link to="/login">
                            <Logout className="icon" />
                        </Link>
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
