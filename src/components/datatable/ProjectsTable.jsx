import './datatable.scss'
import { DataGrid } from '@mui/x-data-grid'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
    deleteProject,
    fetchProjects,
    selectProjects,
} from '../../redux/projectsSlice'
import AlertDialog from '../dialog/Dialog'

const ProjectsTable = () => {
    const [dialogStatus, setDialogStatus] = useState(false)
    const dispatch = useDispatch()
    const projectsData = useSelector(selectProjects)
    const userRows = Object.values(projectsData)

    const taskStatus = useSelector((state) => state.tasks.status)

    const handleDeleteProject = async () => {
        const id = window.location.hash.substring(1)
        await dispatch(deleteProject(id))
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
        { field: 'projectProgress', headerName: 'درصد پیشرفت', width: 150 },
        {
            field: 'action',
            headerName: 'عملیات',
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link
                            to={`/projects/edit-project/${params.row.id}`}
                            style={{ textDecoration: 'none' }}
                        >
                            <div className="viewButton">ویرایش</div>
                        </Link>
                        <Link
                            to={`/projects#${params.row.id}`}
                            className="deleteButton"
                            onClick={() => setDialogStatus(true)}
                        >
                            حذف
                        </Link>
                        <AlertDialog
                            open={dialogStatus}
                            handleClose={() => setDialogStatus(false)}
                            handleCloseNavigate={() => handleDeleteProject()}
                            title={`ایا میخواهید پروژه را حذف کنید؟`}
                            description="با این کار پروژه کامل حذف شده و قابل بازگردانی نیست !"
                        />
                    </div>
                )
            },
        },
    ]

    return (
        <div className="datatable">
            <DataGrid
                className="datagrid"
                rows={userRows}
                columns={userColumns}
                pageSize={8}
                rowsPerPageOptions={[8]}
            />
        </div>
    )
}

export default ProjectsTable
