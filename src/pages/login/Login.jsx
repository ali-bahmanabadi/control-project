import * as React from 'react'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import LocalizationProvider from '@mui/lab/LocalizationProvider'
import { DatePicker, LoadingButton } from '@mui/lab'
import AdapterJalali from '@date-io/date-fns-jalali'
import { CameraAltRounded, LoginRounded } from '@mui/icons-material'
import { styled } from '@mui/material/styles'

import './login.scss'

const Input = styled('input')({
    display: 'none',
})

const Login = () => {
    const [value, setValue] = React.useState(new Date())
    const [loading, setLoading] = React.useState(false)
    function sendDataHandler() {
        setLoading(true)
    }

    return (
        <div className="login">
            <div className="loginWrapper">
                <h3 className="loginTitle">ورود به برنامه</h3>
                <form>
                    <div className="formItemLogin">
                        <label>نام: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="علی"
                            size="small"
                            className="loginField"
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
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>تاریخ تولد: </label>
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                            <DatePicker
                                mask="____/__/__"
                                value={value}
                                onChange={(newValue) => setValue(newValue)}
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
                    <div className="formItemLogin">
                        <label>شماره تماس: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="09121112233"
                            size="small"
                            className="loginField"
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>ایمیل: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="ali@gmail.com"
                            size="small"
                            className="loginField"
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>سمت در پروژه: </label>
                        <Select
                            className="loginField"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            // onChange={handleChange}
                            size="small"
                        >
                            <MenuItem value={10}>مدیر پروژه</MenuItem>
                            <MenuItem value={20}>انجام دهنده پروژه</MenuItem>
                        </Select>
                    </div>
                    <div className="formItemLogin">
                        <label>عکس پروفایل: </label>
                        <label htmlFor="icon-button-file" dir="ltr">
                            <Input
                                accept="image/*"
                                multiple
                                type="file"
                                id="icon-button-file"
                            />
                            <Button
                                dir="rtl"
                                className="loginField"
                                id="icon-button-file"
                                variant="contained"
                                component="span"
                                startIcon={<CameraAltRounded />}
                            >
                                ارسال
                            </Button>
                        </label>
                    </div>
                    <div className="formItemLogin">
                        <LoadingButton
                            variant="contained"
                            startIcon={<LoginRounded />}
                            size="large"
                            loadingPosition="start"
                            onClick={sendDataHandler}
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
