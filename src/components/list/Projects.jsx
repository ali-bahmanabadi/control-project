import './projects.scss'
import Title from '../dashboardHeaderTitle/Title'
import TableComponent from '../table/Table'
import DataTable from '../datatable/DataTable'

const Projects = () => {
    return (
        <div className="projectsList">
            <Title
                title="پروژه ها"
                titleButton="افزودن پروژه جدید"
                titleButtonHref="/projects/add-project"
            />
            <DataTable />
        </div>
    )
}

export default Projects
