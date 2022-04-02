import { useEffect, useState } from 'react'
import { CameraAltRounded, LibraryAddRounded } from '@mui/icons-material'
import { DatePicker, LoadingButton, LocalizationProvider } from '@mui/lab'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import AdapterJalali from '@date-io/date-fns-jalali'
import './addUser.scss'
import styled from '@emotion/styled'
import Title from '../dashboardHeaderTitle/Title'
import { useDispatch, useSelector } from 'react-redux'
import {
    fetchProjects,
    selectAllProjects,
    selectProjects,
} from '../../redux/projectsSlice'
import {
    addNewUser,
    fetchUsers,
    selectUserById,
    updateUser,
} from '../../redux/usersSlice'
import { useNavigate, useParams } from 'react-router-dom'
import { nanoid } from '@reduxjs/toolkit'

const Input = styled('input')({
    display: 'none',
})

const AddUser = ({ title }) => {
    const navigate = useNavigate()
    const { userId } = useParams()
    const dispatch = useDispatch()
    const statusProject = useSelector((state) => state.projects.status)
    const statusUser = useSelector((state) => state.users.status)

    const editUser = useSelector((state) => selectUserById(state, userId))

    const [name, setName] = useState('')
    const [lastName, setLastName] = useState('')
    const [kodmelli, setKodmelli] = useState('')
    const [phone, setPhone] = useState('')
    const [birthday, setBirthday] = useState(new Date())

    useEffect(() => {
        if (statusUser === 'idle') {
            dispatch(fetchUsers())
        }
        if (editUser) {
            setName(editUser.name || '')
            setLastName(editUser.lastName || '')
            setKodmelli(editUser.kodmelli || '')
            setPhone(editUser?.phone || '')
            setBirthday(editUser?.birthday)
        }
    }, [dispatch, editUser, statusProject, statusUser])

    const [loading, setLoading] = useState(false)
    const sendUserDataHandler = async () => {
        setLoading(true)
        if (userId) {
            // save edited user
            await dispatch(
                updateUser({
                    userId,
                    name,
                    lastName,
                    kodmelli,
                    phone,
                    birthday,
                })
            )
        } else {
            // save new user
            await dispatch(
                addNewUser({
                    id: nanoid(),
                    name,
                    lastName,
                    kodmelli,
                    phone,
                    birthday,
                })
            )
        }

        setLoading(false)
        navigate('/users')
    }

    return (
        <div className="addUser">
            <Title title={title} />
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
                            onChange={(e) => setLastName(e.target.value)}
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
                            onChange={(e) => setKodmelli(e.target.value)}
                        />
                    </div>
                    <div className="formItemLogin">
                        <label>تاریخ تولد: </label>
                        <LocalizationProvider dateAdapter={AdapterJalali}>
                            <DatePicker
                                mask="____/__/__"
                                value={birthday}
                                onChange={(newValue) => setBirthday(newValue)}
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
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                        />
                    </div>
                    <div className="formItemLogin">
                        <LoadingButton
                            variant="contained"
                            startIcon={<LibraryAddRounded />}
                            size="large"
                            loadingPosition="start"
                            onClick={sendUserDataHandler}
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
