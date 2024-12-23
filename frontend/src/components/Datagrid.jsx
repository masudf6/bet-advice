import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Box, Paper } from '@mui/material';
import { styled } from '@mui/system';
import bet365 from '../Bet365_Logo.svg';

const StyledLogo = styled('img')(({ theme }) => ({
  height: '20px',
  width: 'auto',
  [theme.breakpoints.down('sm')]: {
    width: 'auto',
    height: '0.65rem',
  },
}))

const DataGridContainer = styled(Box)(({ theme }) => ({
  '& .MuiDataGrid-root': {
    border: 'none',
  },
  '& .MuiDataGrid-row': {
    maxHeight: 'none !important',
  },
  '& .MuiDataGrid-cell': {
    padding: '5px !important',
    backgroundColor: 'transparent',
    whiteSpace: 'normal !important',
    wordBreak: 'break-word !important',
    textAlign: 'left',
    display: 'flex',
    lineHeight: "normal",
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.45rem',
      padding: '2px !important',
    },
  },
  '& .MuiDataGrid-columnHeader': {
    borderBottom: '1px solid #ccc',
    fontWeight: 'bold',
    whiteSpace: 'normal !important',
    wordBreak: 'break-word !important',
    textAlign: 'left',
    display: 'flex',
    lineHeight: "normal",
    [theme.breakpoints.down('sm')]: {
      fontSize: '0.5rem',
      padding: '2px !important',
    },
  },
  '& .MuiDataGrid-sortIcon': {
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.5)',
    },
  },
  '& .MuiDataGrid-checkboxInput': {
    [theme.breakpoints.down('sm')]: {
      transform: 'scale(0.5)',
    },
  },
}))

const columns = [
  { field: 'home_team', headerName: 'Home', flex: 1 },
  { field: 'away_team', headerName: 'Away', flex: 1 },
  { field: 'league', headerName: 'League', flex: 1 },
  { field: 'advice', headerName: 'Advice', flex: 1 },
  { field: 'odds', 
    headerName: 'Odds', 
    flex: 1,
    align: 'center',
    whiteSpace: 'normal !important',
    renderHeader: () => (
      <Box>
        Odds <StyledLogo src={bet365} alt='Bet365' />
      </Box>
    ) 
  },
]

const FixtureDataGrid = ({ fixture }) => {

  const [selectedRows, setSelectedRows] = useState([])

  const aggrOdds = selectedRows.reduce((sum, rowID) => {
    const row = fixture.find((row) => row.fixture_id === rowID)
    return sum * (row ? row.odds : 0)
}, 1)

  return (
    <Paper>
      <DataGridContainer>
        <Box sx={{paddingTop: '1em'}}>
          <strong>Total Oddsss: </strong>{aggrOdds.toFixed(2)}
        </Box>
        <DataGrid
          rows={fixture}
          columns={columns}
          getRowId={(row) => row.fixture_id}
          pageSize={12}
          checkboxSelection
          disableSelectionOnClick
          autoHeight
          disableColumnMenu
          onRowSelectionModelChange={
            (selection) => {
              setSelectedRows(selection)
              }
            }
        />
      </DataGridContainer>
    </Paper>
  )
}

export default FixtureDataGrid;
