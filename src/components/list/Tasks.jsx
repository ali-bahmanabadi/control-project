import './tasks.scss'
import Title from '../dashboardHeaderTitle/Title'

const Tasks = () => {
    return (
        <div className="tasksList">
            <Title
                title="وظایف"
                titleButton="افزودن وظیفه جدید"
                titleButtonHref="/tasks/add-task"
            />
        </div>
    )
}

export default Tasks
