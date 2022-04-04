import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Title from '../../../components/dashboardHeaderTitle/Title'
import TasksTable from '../../../components/datatable/TasksTable'
import { fetchLogin } from '../../../redux/loginSlice'
import './tasks.scss'

const Tasks = () => {
    const dispatch = useDispatch()

    const loginStatus = useSelector((state) => state.login.status)
    const loginData = useSelector((state) => state.login.data)

    React.useEffect(() => {
        if (loginStatus === 'idle') {
            dispatch(fetchLogin())
        }
    }, [dispatch, loginStatus])

    let button = <Title title="وظایف" />
    if (loginData && loginData.position && loginData.position === 'admin') {
        button = (
            <Title
                title="وظایف"
                titleButton="افزودن وظیفه جدید"
                titleButtonHref="/tasks/add-task"
            />
        )
    }

    return (
        <div className="tasksList">
            {button}
            <TasksTable />
        </div>
    )
}

export default Tasks
