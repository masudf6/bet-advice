import { Grid } from '@mui/material'
import React from 'react'

const FixtureRow = ({row}) => {
  return (
    <Grid item container direction='row'>
        <Grid item xs={3}>{row.home_team}</Grid>
        <Grid item xs={3}>{row.away_team}</Grid>
        <Grid item xs={3}>{row.league}</Grid>
        <Grid item xs={3}>{row.advice}</Grid>
    </Grid>
  )
}

export default FixtureRow
