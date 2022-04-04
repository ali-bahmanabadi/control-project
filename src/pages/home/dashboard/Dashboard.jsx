import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects, selectProjects } from '../../../redux/projectsSlice'
import { fetchTasks, selectAllTask } from '../../../redux/tasksSlice'
import { fetchUsers, selectUsersIds } from '../../../redux/usersSlice'
import Widget from '../../../components/widget/Widget'
import Featured from '../../../components/featured/Featured'
import Chart from '../../../components/chart/Chart'
import {
    AssignmentIndRounded,
    PeopleAltRounded,
    TaskAltRounded,
} from '@mui/icons-material'
import './dashboard.scss'

const Dashboard = () => {
    const dispatch = useDispatch()

    // users store
    const usersStatus = useSelector((state) => state.users.status)
    const usersIds = useSelector(selectUsersIds)
    const usersLength = usersIds.length

    // task store
    const taskStatus = useSelector((state) => state.tasks.status)
    const allTask = useSelector(selectAllTask)
    const tasksLength = allTask.length

    // project store
    const projectStatus = useSelector((state) => state.projects.status)
    const projectsData = useSelector(selectProjects)
    const projectsLength = Object.keys(projectsData).length

    useEffect(() => {
        if (projectStatus === 'idle') {
            dispatch(fetchProjects())
        }
        if (taskStatus === 'idle') {
            dispatch(fetchTasks())
        }
        if (usersStatus === 'idle') {
            dispatch(fetchUsers())
        }
    }, [dispatch, projectStatus, taskStatus, usersStatus])

    // data for chart
    // ----------------------------------------------------------
    const projectDataClone = JSON.parse(JSON.stringify(projectsData))

    const chartData = {}

    if (projectStatus === 'success' && taskStatus === 'success') {
        for (const key in projectsData) {
            chartData[key] = []
        }

        allTask.forEach((task) => {
            if (chartData[task.projectId] !== undefined) {
                chartData[task.projectId].push(task)
            }
        })
    }

    // Calculate the percentage of project progress
    // ----------------------------------------------------------

    const finalData = {}

    if (projectStatus === 'success' && taskStatus === 'success') {
        for (const key in projectsData) {
            finalData[key] = []
        }

        allTask.forEach((task) => {
            if (finalData[task.projectId] !== undefined) {
                finalData[task.projectId].push(task)
            }
        })

        for (const key in finalData) {
            if (finalData[key].length > 0) {
                const coefficient = []
                const progress = []
                finalData[key].forEach((task) => {
                    progress.push(+(task.taskProgress * task.taskCoefficient))
                    coefficient.push(+task.taskCoefficient)
                })
                const coefficientTotal = coefficient.reduce((a, b) => a + b, 0)
                const progressTotal = progress.reduce((a, b) => a + b, 0)
                const finalProgress = (
                    progressTotal / coefficientTotal
                )?.toFixed(1)

                projectDataClone[key].projectProgress = finalProgress
            }
        }
    }

    // =================================================

    const chartRender = []
    if (chartData) {
        for (const key in chartData) {
            chartRender.push(
                <div className="charts">
                    <Featured
                        projectName={projectDataClone[key].title}
                        projectUsers={
                            projectDataClone[key].projectWorkersId.length
                        }
                        projectTasks={chartData[key].length}
                        percentage={projectDataClone[key].projectProgress}
                    />
                    <Chart title="وظایف پروژه" data={chartData[key]} />
                </div>
            )
        }
    }

    return (
        <>
            <div className="widgets">
                <Widget
                    title="پروژه ها"
                    number={projectsLength}
                    icon={<TaskAltRounded />}
                />
                <Widget
                    title="کارمندان"
                    number={usersLength}
                    icon={<PeopleAltRounded />}
                />
                <Widget
                    title="وظایف"
                    number={tasksLength}
                    icon={<AssignmentIndRounded />}
                />
            </div>
            {chartRender &&
                chartRender.length > 0 &&
                chartRender.map((chart, index) => (
                    <React.Fragment key={index}>{chart} </React.Fragment>
                ))}
        </>
    )
}

export default Dashboard
