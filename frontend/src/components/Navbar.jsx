import React from 'react'
import { Breadcrumbs, Link, Switch } from '@mui/material'

export const Navbar = ({theme, toggleTheme}) => {
  return (
    <Breadcrumbs sx={{margin: '', padding: '.5em', width: '100%'}}>
        <Link underline="hover" color="inherit" href="/">
            Home
        </Link>
        <Link underline="hover" color="inherit" href="/about">
            About
        </Link>
        <Switch checked={theme === 'dark'} onChange={toggleTheme} defaultChecked color="warning"/>
    </Breadcrumbs>
  )
}
