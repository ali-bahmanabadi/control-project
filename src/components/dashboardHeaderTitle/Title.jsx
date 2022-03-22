import { AddCircleOutlineRounded } from '@mui/icons-material'
import { Chip } from '@mui/material'
import './title.scss'

const Title = ({ title, titleButton, titleButtonHref }) => {
    return (
        <div className="titleComponent">
            <div className="title">{title}</div>
            {titleButton && titleButton.length > 0 && (
                <Chip
                    label={titleButton}
                    icon={<AddCircleOutlineRounded />}
                    component="a"
                    href={titleButtonHref}
                    clickable
                    color="primary"
                />
            )}
        </div>
    )
}

export default Title
