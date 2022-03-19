import React, { useState } from 'react'
import { LibraryAddRounded } from '@mui/icons-material'
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab'
import {
    Checkbox,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    TextField,
} from '@mui/material'
import AdapterJalali from '@date-io/date-fns-jalali'
import './addProjects.scss'

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

const AddProject = () => {
    const [value, setValue] = useState(new Date())
    const [loading, setLoading] = useState(false)
    function sendDataHandler() {
        setLoading(true)
    }

    const [personName, setPersonName] = React.useState([])

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
        <div className="addProject">
            <div className="addProjectTitle">افزورن پروژه جدید</div>
            <div>
                <form>
                    <div className="formItemLogin">
                        <label>اسم پروژه: </label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="اسم"
                            size="small"
                            className="loginField"
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>توضیحات پروژه:</label>
                        <TextField
                            id="standard-basic"
                            variant="outlined"
                            placeholder="توضیحات ..."
                            size="large"
                            className="loginField"
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>تاریخ شروع پروژه: </label>
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
                        <label>تاریخ پایان پروژه: </label>
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
                    <div
                        className="formItemLogin"
                        style={{ overflow: 'hidden' }}
                    >
                        <label>کارمندان پروژه :</label>
                        <Select
                            className="loginField"
                            labelId="demo-multiple-checkbox-label"
                            id="demo-multiple-checkbox"
                            multiple
                            value={personName}
                            onChange={handleChange}
                            // input={<OutlinedInput label="Tag" />}
                            renderValue={(selected) => selected.join(' - ')}
                            MenuProps={MenuProps}
                            style={{ overflow: 'hidden' }}
                        >
                            {names.map((name) => (
                                <MenuItem key={name} value={name}>
                                    <Checkbox
                                        checked={personName.indexOf(name) > -1}
                                    />
                                    <ListItemText primary={name} />
                                </MenuItem>
                            ))}
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

export default AddProject
