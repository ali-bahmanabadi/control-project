import { AddCircleOutlineRounded, DeleteForever } from '@mui/icons-material'
import { Chip } from '@mui/material'
import React from 'react'
import Datatable from '../datatable/Datatable'

import './projects.scss'

const Projects = () => {
    return (
        <div className="projects">
            <div className="projectHeader">
                <div className="projectsTitle">پروژه ها</div>
                <Chip
                    label="افزودن پروزه جدید"
                    icon={<AddCircleOutlineRounded />}
                    component="a"
                    href="projects/add-project"
                    clickable
                    color="primary"
                />
            </div>
            <Datatable />
        </div>
    )
}

export default Projects
