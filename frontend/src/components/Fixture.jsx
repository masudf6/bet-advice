import React, { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Checkbox, Collapse, IconButton, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import bet365 from '../Bet365_Logo.svg'

const Row = ({row, handleChange}) => {

  const [open, setOpen] = React.useState(false)

  return (
    <>
      <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
        <TableCell align="left">
          <Checkbox
            onChange={(e) => {
              handleChange(e.target.checked, row)
            }}
          />
        </TableCell>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left">{row.home_team}</TableCell>
        <TableCell align="left">{row.away_team}</TableCell>
        <TableCell align="left">{row.league}</TableCell>
        <TableCell align="left">{row.advice}</TableCell>
        <TableCell align="left">{row.odds}</TableCell>
      </TableRow>

      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography component='div' variant="h7">
                <Box sx={{fontWeight: 'bold'}}>Recent Form</Box>
              </Typography>
              <Table size="small" sx={{ width: '70%', [`& .${tableCellClasses.root}`]: {borderBottom: "none"}}}>
                <TableRow>
                  <TableCell variant='head'>{row.home_team}</TableCell>
                  <TableCell>{row.form_home_team}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell variant='head'>{row.away_team}</TableCell>
                  <TableCell>{row.form_away_team}</TableCell>
                </TableRow>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}

const Fixture = ({ fixture }) => {

  const [checkedRows, setCheckedRows] = useState([])

  const handleChange = (checked, row) => {
    
    checked 
      ? setCheckedRows((prev) => [...prev, row])
      : setCheckedRows((prev) => prev.filter((r) => r.home_team_id !== row.home_team_id)) 
  }

  return (
    <>
      <Box>
        <Typography variant='h4' color='#FF6600' marginBottom='.5em'>
          Multi Odds: { checkedRows.reduce((total, row) => (total * row.odds).toFixed(2), 1) }
        </Typography>
      </Box>
      <TableContainer component={Paper} elevation={10} sx={{marginBottom: '2em', background: 'transparent'}}>
        <Table sx={{ minWidth: 350, }} aria-label="simple table">
          <TableHead sx={{fontWeight: 'bold'}}>
            <TableRow>
              <TableCell align="left"></TableCell>
              <TableCell align="left"></TableCell>
              <TableCell align="left"><Box sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Home</Box></TableCell>
              <TableCell align="left"><Box sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Away</Box></TableCell>
              <TableCell align="left"><Box sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>League</Box></TableCell>
              <TableCell align="left"><Box sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Advice</Box></TableCell>
              <TableCell align="left"><Box sx={{fontWeight: 'bold', textTransform: 'uppercase'}}>Odds <img src={bet365} width={40} height={20} alt='bet365'/></Box></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fixture?.map((row) => <Row row={row} handleChange={handleChange}/>)}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default Fixture