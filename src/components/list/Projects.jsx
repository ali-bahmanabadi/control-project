import './projects.scss'
import Title from '../dashboardHeaderTitle/Title'
import ProjectsTable from '../datatable/ProjectsTable'

const Projects = () => {
    return (
        <div className="projectsList">
            <Title
                title="پروژه ها"
                titleButton="افزودن پروژه جدید"
                titleButtonHref="/projects/add-project"
            />
            <ProjectsTable />
        </div>
    )
}

export default Projects
