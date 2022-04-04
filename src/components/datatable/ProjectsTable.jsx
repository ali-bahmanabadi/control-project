import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
// redux 
import { useDispatch, useSelector } from 'react-redux'
import { deleteProject, selectProjects } from '../../redux/projectsSlice'
import { fetchTasks, selectAllTask } from '../../redux/tasksSlice'
// mui 
import { DataGrid } from '@mui/x-data-grid'
import { Button } from '@mui/material'
import { DeleteRounded, EditRounded } from '@mui/icons-material'
// component
import AlertDialog from '../dialog/Dialog'
import './datatable.scss'

const ProjectsTable = () => {
    const dispatch = useDispatch()

    // local state
    const [dialogStatus, setDialogStatus] = useState(false)

    // task store
    const taskStatus = useSelector((state) => state.tasks.status)
    const allTask = useSelector(selectAllTask)

    // project store
    const projectsData = useSelector(selectProjects)
    const projectStatus = useSelector((state) => state.projects.status)

    // Calculate the percentage of project progress
    // ----------------------------------------------------------

    const projectDataClone = JSON.parse(JSON.stringify(projectsData))

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
                    console.log(task)
                    progress.push(+(task.taskProgress * task.taskCoefficient))
                    coefficient.push(+task.taskCoefficient)
                })
                console.log(coefficient)
                console.log(progress)
                const coefficientTotal = coefficient.reduce((a, b) => a + b, 0)
                const progressTotal = progress.reduce((a, b) => a + b, 0)
                const finalProgress = (
                    progressTotal / coefficientTotal
                )?.toFixed(1)
                console.log(finalProgress)

                projectDataClone[key].projectProgress = finalProgress
                console.log('final', projectDataClone)
            }
        }
    }

    // =================================================

    const userRows = Object.values(projectDataClone)

    useEffect(() => {
        if (taskStatus === 'idle') {
            dispatch(fetchTasks())
        }
    }, [dispatch, taskStatus])

    const handleDeleteProject = () => {
        const id = window.location.hash.substring(1)
        dispatch(deleteProject(id))
        setDialogStatus(false)
    }

    const userColumns = [
        { field: 'range', headerName: 'ردیف', width: 70 },
        { field: 'title', headerName: 'اسم', width: 150 },
        {
            field: 'projectStart',
            headerName: 'تاریخ شروع',
            width: 150,
            renderCell: (params) => {
                return (
                    <span>
                        {new Date(params.row.projectStart).toLocaleDateString(
                            'fa-IR'
                        )}
                    </span>
                )
            },
        },
        {
            field: 'projectFinish',
            headerName: 'تاریخ پایان',
            width: 150,
            renderCell: (params) => {
                return (
                    <span>
                        {new Date(params.row.projectFinish).toLocaleDateString(
                            'fa-IR'
                        )}
                    </span>
                )
            },
        },
        {
            field: 'numberOfWorker',
            headerName: 'تعداد کارمندان',
            width: 150,
            renderCell: (params) => {
                return <span>{params.row.projectWorkersId.length}</span>
            },
        },
        {
            field: 'projectProgress',
            headerName: 'درصد پیشرفت',
            width: 150,
            renderCell: (params) => {
                return <span>{params.row.projectProgress}%</span>
            },
        },
        {
            field: 'action',
            headerName: 'عملیات',
            width: 250,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link
                            to={`/projects/edit-project/${params.row.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <Button
                                variant="outlined"
                                size="small"
                                startIcon={<EditRounded />}
                            >
                                ویرایش
                            </Button>
                        </Link>
                        <Link
                            to={`/projects#${params.row.id}`}
                            onClick={() => setDialogStatus(true)}
                        >
                            <Button
                                variant="outlined"
                                color="error"
                                size="small"
                                startIcon={<DeleteRounded />}
                            >
                                حذف
                            </Button>
                        </Link>
                    </div>
                )
            },
        },
    ]

    return (
        <div className="datatable">
            {projectStatus === 'success' &&
                userRows &&
                userRows.length === 0 && (
                    <div>در حال حاضر پروژه ای وجود ندارد!</div>
                )}
            {projectStatus === 'success' && userRows && userRows.length > 0 && (
                <DataGrid
                    className="datagrid"
                    rows={userRows}
                    columns={userColumns}
                    pageSize={8}
                    rowsPerPageOptions={[8]}
                />
            )}
            <AlertDialog
                open={dialogStatus}
                handleClose={() => setDialogStatus(false)}
                handleCloseNavigate={() => handleDeleteProject()}
                title={`آیا میخواهید پروژه را حذف کنید؟`}
                description="با این کار پروژه کامل حذف شده و قابل بازگردانی نیست !"
            />
        </div>
    )
}

export default ProjectsTable
