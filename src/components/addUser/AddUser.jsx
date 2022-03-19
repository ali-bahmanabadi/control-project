import { useState } from 'react'
import { CameraAltRounded, LibraryAddRounded } from '@mui/icons-material'
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import AdapterJalali from '@date-io/date-fns-jalali'
import './addUser.scss'
import styled from '@emotion/styled'

const Input = styled('input')({
    display: 'none',
})

const AddUser = ({ title }) => {
    const [value, setValue] = useState(new Date())
    const [loading, setLoading] = useState(false)
    function sendDataHandler() {
        setLoading(true)
    }

    return (
        <div className="addUser">
            <div className="addUserTitle">{title}</div>
            <div>
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
                        <label>پروژه مربوطه:</label>
                        <Select
                            className="loginField"
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            // value={age}
                            // onChange={handleChange}
                            size="small"
                        >
                            <MenuItem value={10}>پروژه 1</MenuItem>
                            <MenuItem value={20}>پروژه 2</MenuItem>
                            <MenuItem value={30}>پروژه 3</MenuItem>
                            <MenuItem value={40}>پروژه 4</MenuItem>
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
                            startIcon={<LibraryAddRounded />}
                            size="large"
                            loadingPosition="start"
                            onClick={sendDataHandler}
                            loading={loading}
                        >
                            ذخیره اطلاعات
                        </LoadingButton>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddUser
