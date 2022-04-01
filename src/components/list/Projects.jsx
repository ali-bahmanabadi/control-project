import './projects.scss'
import Title from '../dashboardHeaderTitle/Title'
import ProjectsTable from '../datatable/ProjectsTable'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../redux/projectsSlice'
import { useEffect } from 'react'

const Projects = () => {
    const dispatch = useDispatch()
    const status = useSelector((state) => state.projects.status)
    const error = useSelector((state) => state.projects.error)

    useEffect(() => {
        if (status === 'idle') {
            dispatch(fetchProjects())
        }
    }, [dispatch, status])

    return (
        <div className="projectsList">
            <Title
                title="پروژه ها"
                titleButton="افزودن پروژه جدید"
                titleButtonHref="/projects/add-project"
            />
            {status === 'loading' && <h1>Loading...</h1>}
            {status === 'success' && <ProjectsTable />}
            {status === 'error' && <h1>پروژه ها دریافت نشد{error}</h1>}
            {/* <ProjectsTable /> */}
        </div>
    )
}

export default Projects
