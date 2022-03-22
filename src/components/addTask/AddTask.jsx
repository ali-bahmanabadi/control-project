import { useState } from 'react'
// component
import Title from '../dashboardHeaderTitle/Title'
// material
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab'
import {
    Checkbox,
    ListItemText,
    MenuItem,
    Select,
    TextField,
} from '@mui/material'
import AdapterJalali from '@date-io/date-fns-jalali'
// css
import './addTask.scss'
import { LibraryAddRounded } from '@mui/icons-material'

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
}

const names = [
    'Oliver Hansen',
    'Van Henry',
    'April Tucker',
    'Ralph Hubbard',
    'Omar Alexander',
    'Carlos Abbott',
    'Miriam Wagner',
    'Bradley Wilkerson',
    'Virginia Andrews',
    'Kelly Snyder',
]

const AddTask = () => {
    const [value, setValue] = useState(new Date())
    const [loading, setLoading] = useState(false)
    function sendDataHandler() {
        setLoading(true)
    }

    const [personName, setPersonName] = useState([])

    const handleChange = (event) => {
        const {
            target: { value },
        } = event
        setPersonName(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value
        )
    }

    return (
        <div className="addTask">
            <Title title="افزودن وظیفه جدید" />
            <div className="addTaskWrapper">
                <form>
                    <div className="formItemLogin">
                        <label>اسم: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="اسم"
                            size="small"
                            className="loginField"
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>توضیحات:</label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="توضیحات ..."
                            size="large"
                            className="loginField"
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>تاریخ شروع: </label>
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
                        <label>تاریخ پایان: </label>
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
                        <label>ضریب: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="عدد سختی پروزه را وارد کنید"
                            size="small"
                            className="loginField"
                            type="number"
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>درصد پیشرفت پروژه: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="درصد پیشرفت پروژه بین 0 تا 100 را وارد کنید"
                            size="small"
                            className="loginField"
                            type="number"
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

export default AddTask
