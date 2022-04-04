import { KeyboardDoubleArrowLeftSharp } from '@mui/icons-material'
import './widget.scss'

const Widget = ({ title, number, icon }) => {
    return (
        <div className="widget">
            <div className="left">
                <span className="title">
                    <KeyboardDoubleArrowLeftSharp fontSize="small" />
                    {title}
                </span>
                <span className="counter">{number}</span>
            </div>
            <div className="right">
                <div className="percentage">{icon}</div>
            </div>
        </div>
    )
}

export default Widget
