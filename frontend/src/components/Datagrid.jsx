import React, { useState } from 'react';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'home_team', headerName: 'Home Team', width: 100 },
  { field: 'away_team', headerName: 'Away Team', width: 100 },
  { field: 'league', headerName: 'League', width: 100, filterable: true },
  { field: 'advice', headerName: 'Advice', width: 300 },
  { field: 'odds', headerName: 'Odds', width: 80 },
]

const FixturesDataGrid = ({ fixture }) => {

    const [selectedRows, setSelectedRows] = useState([])

    const aggrOdds = selectedRows.reduce((sum, rowID) => {
        const row = fixture.find((row) => row.fixture_id === rowID)
        return sum * (row ? row.odds : 0)
    }, 1)

    const getRowId = (row) => row.fixture_id

  return (
    <div>
      <div sx={{ marginTop: 16, marginBottom: 16 }}>
        <strong>Total Odds: </strong>{aggrOdds}
      </div>
      <DataGrid
        getRowId={getRowId}
        rows={fixture}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
        autoHeight
        onSelectionModelChange={(selection) => setSelectedRows(selection)}
      />
    </div>
  )
}

export default FixturesDataGrid;
