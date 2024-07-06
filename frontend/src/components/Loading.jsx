import { Grid, Skeleton } from '@mui/material'
import React from 'react'

const Loading = () => {

  return (
    <>
        <Grid container spacing={1} direction="column">

            {[...Array(5)].map((e, i) => <Grid item><Skeleton variant='h1' animation='wave'/></Grid>)}

        </Grid>
    </>
  )
}

export default Loading
