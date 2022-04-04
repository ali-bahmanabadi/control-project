import './featured.scss'
import { CircularProgressbar } from 'react-circular-progressbar'
import 'react-circular-progressbar/dist/styles.css'

const Featured = ({ projectName, projectUsers, projectTasks, percentage }) => {
    return (
        <div className="featured">
            <div className="top">
                <h1 className="title">پروژه</h1>
            </div>
            <div className="bottom">
                <div className="featuredChart">
                    <CircularProgressbar
                        value={percentage}
                        text={`${percentage}%`}
                        strokeWidth={10}
                    />
                </div>
                <p className="amount">{projectName}</p>
                <div className="summary">
                    <div className="item">
                        <div className="itemTitle">تعداد کارمندان:</div>
                        <div className="itemResult">
                            <div className="resultAmount">{projectUsers}</div>
                        </div>
                    </div>
                    <div className="item">
                        <div className="itemTitle">تعداد وظایف:</div>
                        <div className="itemResult">
                            <div className="resultAmount">{projectTasks}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Featured
