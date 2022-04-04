import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProjects } from '../../../redux/projectsSlice'
import Title from '../../../components/dashboardHeaderTitle/Title'
import ProjectsTable from '../../../components/datatable/ProjectsTable'
import './projects.scss'

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
