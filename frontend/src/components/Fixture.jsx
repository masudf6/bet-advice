import React from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


const FixtureRow = ({row}) => {
  return (
        <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
          <TableCell align="left">{row.home_team}</TableCell>
          <TableCell align="left">{row.away_team}</TableCell>
          <TableCell align="left">{row.league}</TableCell>
          <TableCell align="left">{row.advice}</TableCell>
        </TableRow>
  )
}

const Fixture = ({fixture}) => {
  return (
      <TableContainer component={Paper} elevation={10} sx={{marginBottom: '2em'}}>
      <Table sx={{ minWidth: 350, }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left">Home</TableCell>
            <TableCell align="left">Away</TableCell>
            <TableCell align="left">League</TableCell>
            <TableCell align="left">Advice</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {fixture?.map((team_fixture) => <FixtureRow row={team_fixture} />)}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Fixture
