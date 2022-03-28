import './tasks.scss'
import Title from '../dashboardHeaderTitle/Title'
import TasksTable from '../datatable/TasksTable'

const Tasks = () => {
    return (
        <div className="tasksList">
            <Title
                title="وظایف"
                titleButton="افزودن وظیفه جدید"
                titleButtonHref="/tasks/add-task"
            />
            <TasksTable />
        </div>
    )
}

export default Tasks
