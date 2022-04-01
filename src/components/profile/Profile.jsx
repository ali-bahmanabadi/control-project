import { EditRounded } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import './profile.scss'

const Profile = () => {
    const navigate = useNavigate()
    const param = useParams()
    const { state: userData } = useLocation()
    console.log(userData)

    const handleButtonClick = () => {
        if (userData) {
            navigate(`/users/edit-user/${userData.id}`)
        }
    }

    return (
        <div className="profile">
            <div className="profileWrapper">
                <div className="profileButton">
                    <Button
                        variant="contained"
                        startIcon={<EditRounded />}
                        onClick={handleButtonClick}
                    >
                        ویرایش
                    </Button>
                </div>
                <div className="topDetail">
                    <img
                        src="https://cdn01.zoomit.ir/2021/2/apple-car-hyundai-2-copy-1200x800.jpg?w=768"
                        alt=""
                        className="profileImage"
                    />
                    <div>
                        <div className="name">{userData.name}</div>
                        <div className="lastName">{userData.lastName}</div>
                    </div>
                </div>
                <div className="otherDetail">
                    <div className="right">
                        <span className="title">کدملی</span>
                        <span className="value">{userData.kodmelli}</span>
                        <span className="title">تاریخ تولد</span>
                        <span className="value">{userData.birthday}</span>
                        <span className="title">شماره تماس</span>
                        <span className="value">{userData.phone}</span>
                    </div>
                    <div className="left">
                        <span className="title">ایمیل</span>
                        <span className="value"></span>
                        <span className="title">سمت</span>
                        <span className="value">مدیر</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
