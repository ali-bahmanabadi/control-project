import * as React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MenuItem, Select } from '@mui/material'
import { LoadingButton } from '@mui/lab'
import { LoginRounded } from '@mui/icons-material'
import { fetchUsers, selectAllUsers } from '../../redux/usersSlice'
import './login.scss'
import { setStatus } from '../../redux/loginSlice'

const Login = () => {
    const dispatch = useDispatch()

    // users store
    const usersStatus = useSelector((state) => state.users.status)
    const allUsers = useSelector(selectAllUsers)

    // local state
    const [userLoginId, setUserLoginId] = React.useState('')
    const [role, setRole] = React.useState('')

    React.useEffect(() => {
        if ((usersStatus === 'idle') & (role === 'user')) {
            dispatch(fetchUsers())
        }
    }, [dispatch, role, usersStatus])

    const [loading, setLoading] = React.useState(false)

    const sendLoginDataHandler = () => {
        setLoading(true)
        dispatch(setStatus({ position: role, userId: userLoginId }))
        setLoading(false)
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <h3 className="loginTitle">ورود به برنامه</h3>
                <form>
                    <div className="formItemLogin">
                        <label>سمت:</label>
                        <Select
                            className="loginField"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={role}
                            onChange={(event) => setRole(event.target.value)}
                            size="small"
                        >
                            <MenuItem value="admin">مدیر</MenuItem>
                            <MenuItem value="user">کاربر</MenuItem>
                        </Select>
                    </div>
                    {role === 'user' && (
                        <div className="formItemLogin">
                            <label>پروفایل:</label>
                            <Select
                                className="loginField"
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={userLoginId}
                                onChange={(e) => setUserLoginId(e.target.value)}
                                size="small"
                            >
                                {allUsers &&
                                    allUsers.length > 0 &&
                                    allUsers.map((user) => (
                                        <MenuItem key={user.id} value={user.id}>
                                            {user.name + ' ' + user.lastName}
                                        </MenuItem>
                                    ))}
                            </Select>
                        </div>
                    )}

                    <div className="formItemLogin">
                        <LoadingButton
                            variant="contained"
                            startIcon={<LoginRounded />}
                            size="large"
                            loadingPosition="start"
                            onClick={sendLoginDataHandler}
                            loading={loading}
                        >
                            ورود
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
