import * as React from 'react'
import { useNavigate } from 'react-router-dom'
// redux
import { useDispatch, useSelector } from 'react-redux'
import { fetchLogin, setStatus } from '../../redux/loginSlice'
import { fetchUsers, selectAllUsers } from '../../redux/usersSlice'
// mui
import { MenuItem, Select, TextField } from '@mui/material'
import { LoadingButton, DatePicker } from '@mui/lab'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { LoginRounded } from '@mui/icons-material'
import AdapterJalali from '@date-io/date-fns-jalali'
import './login.scss'

const Login = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    // login store
    const loginStatus = useSelector((state) => state.login.status)
    const loginData = useSelector((state) => state.login)

    // users store
    const usersStatus = useSelector((state) => state.users.status)
    const allUsers = useSelector(selectAllUsers)

    // local state
    const [role, setRole] = React.useState('')
    const [userLoginId, setUserLoginId] = React.useState('')
    const [name, setName] = React.useState('')
    const [lastName, setLastName] = React.useState('')
    const [kodmelli, setKodmelli] = React.useState('')
    const [phone, setPhone] = React.useState('')
    const [birthday, setBirthday] = React.useState(new Date())

    React.useEffect(() => {
        if (loginStatus === 'success') {
            setName(loginData.data.name || '')
            setLastName(loginData.data.lastName || '')
            setKodmelli(loginData.data.kodmelli || '')
            setPhone(loginData.data.phone || '')
            setBirthday(loginData.data.birthday || new Date())
        }
    }, [loginStatus, loginData])

    React.useEffect(() => {
        if (usersStatus === 'idle' && role === 'user') {
            dispatch(fetchUsers())
        }
        if (loginStatus === 'idle') {
            dispatch(fetchLogin())
        }
    }, [dispatch, loginStatus, role, usersStatus])

    const [loading, setLoading] = React.useState(false)

    const sendLoginDataHandler = () => {
        setLoading(true)
        dispatch(
            setStatus({
                position: role,
                userId: userLoginId,
                name,
                lastName,
                kodmelli,
                phone,
                birthday,
            })
        )

        setLoading(false)
        if (role === 'admin') {
            navigate('/dashboard')
        } else {
            navigate('/tasks')
        }
    }

    const canILogin = () => {
        if (role === 'user') {
            return !!userLoginId
        }
        if (role === 'admin') {
            return true
        }
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

                    {role === 'admin' && (
                        <>
                            <div className="formItemLogin">
                                <label>نام: </label>
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    placeholder="علی"
                                    size="small"
                                    className="loginField"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                            <div className="formItemLogin">
                                <label>نام خانوادگی: </label>
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    placeholder="بهمن ابادی"
                                    size="small"
                                    className="loginField"
                                    value={lastName}
                                    onChange={(e) =>
                                        setLastName(e.target.value)
                                    }
                                />
                            </div>
                            <div className="formItemLogin">
                                <label>کدملی: </label>
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    placeholder="002220022"
                                    size="small"
                                    className="loginField"
                                    value={kodmelli}
                                    onChange={(e) =>
                                        setKodmelli(e.target.value)
                                    }
                                />
                            </div>
                            <div className="formItemLogin">
                                <label>شماره تماس: </label>
                                <TextField
                                    id="standard-basic"
                                    variant="outlined"
                                    placeholder="09121112233"
                                    size="small"
                                    className="loginField"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                />
                            </div>
                            <div className="formItemLogin">
                                <label>تاریخ تولد: </label>
                                <LocalizationProvider
                                    dateAdapter={AdapterJalali}
                                >
                                    <DatePicker
                                        mask="____/__/__"
                                        value={birthday}
                                        onChange={(newValue) =>
                                            setBirthday(newValue)
                                        }
                                        renderInput={(params) => (
                                            <TextField
                                                {...params}
                                                className="loginField"
                                            />
                                        )}
                                        size="small"
                                    />
                                </LocalizationProvider>
                            </div>
                        </>
                    )}

                    <div className="formItemLogin">
                        <LoadingButton
                            variant="contained"
                            startIcon={<LoginRounded />}
                            size="large"
                            loadingPosition="start"
                            onClick={sendLoginDataHandler}
                            loading={loading}
                            disabled={!canILogin()}
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
