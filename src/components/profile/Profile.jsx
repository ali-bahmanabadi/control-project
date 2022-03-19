import { EditRounded } from '@mui/icons-material'
import { Button } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import './profile.scss'

const Profile = () => {
    const navigate = useNavigate()
    return (
        <div className="profile">
            <div className="profileWrapper">
                <div className="profileButton">
                    <Button
                        variant="contained"
                        startIcon={<EditRounded />}
                        onClick={() => navigate('/profile/edit-profile')}
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
                        <div className="name">علی</div>
                        <div className="lastName">بهمن ابادی</div>
                    </div>
                </div>
                <div className="otherDetail">
                    <div className="right">
                        <span className="title">کدملی</span>
                        <span className="value">0022113344</span>
                        <span className="title">تاریخ تولد</span>
                        <span className="value">1376/12/08</span>
                        <span className="title">شماره تماس</span>
                        <span className="value">0932548955</span>
                    </div>
                    <div className="left">
                        <span className="title">ایمیل</span>
                        <span className="value">ali@gmail.com</span>
                        <span className="title">سمت</span>
                        <span className="value">مدیر</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile
