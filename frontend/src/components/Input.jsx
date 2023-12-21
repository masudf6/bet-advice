import { Autocomplete, Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import Fixture from './Fixture'
import topEuropeanClubs from './topEuropeanClubs'

const Input = () => {

    const [team, setTeam] = useState()
    const [rows, setRows] = useState()

    const handleChange = (e, tags) => {
        const team_input = tags
        setTeam(team_input)
    }

    const handleClick = async () => {

        const res = await axios.post('http://localhost:3000/api', {teams: team})
        const fixture = res.data

        // Saving data to session storage to hydrate the app
        window.sessionStorage.setItem('fixture', JSON.stringify(fixture))

        const session_data = JSON.parse(window.sessionStorage.getItem('fixture'))
        setRows(session_data)
        
    }

    useEffect(() => {
        //render after refresh
        const session_data = JSON.parse(window.sessionStorage.getItem('fixture'))
        console.log(session_data)
        setRows(session_data)
    }, [])

  return (
    <Box textAlign={'center'}>
        <Box marginBottom={'4em'}>
            <Autocomplete
                sx={{ width: '50%', margin: 'auto', marginBottom: '1em' }}
                multiple
                id="teams"
                groupBy={(option) => option.league}
                options={topEuropeanClubs}
                getOptionLabel={(option) => option.title}
                isOptionEqualToValue={(option, value) => option.title === value.title}
                filterSelectedOptions
                renderInput={(params) => (
                <TextField
                    {...params}
                    label="Your Teams"
                    placeholder="Team Names"
                />
                )}
                onChange={handleChange}
            />
            <Button variant='contained' color='warning' sx={{width: '50%'}} onClick={handleClick}>Call API</Button>
            </Box>
            {!rows? 'Select your teams to get advice' : <Fixture fixture={rows} />}
        </Box>
  )
}

export default Input
