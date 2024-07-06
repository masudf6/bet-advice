import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'

const CombinedOdds = ({rows}) => {

  return (
    <Box marginBottom={'2em'}>
        <Typography variant='h4'>
            Combined Odds: 
            <Typography variant='h4' color={'#0FFF50'} >
                {rows && rows.reduce((total, row) => (total * row.odds).toFixed(2), 1)}
            </Typography>
        </Typography>
    </Box>
  )
}

export default CombinedOdds
