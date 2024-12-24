import { Autocomplete, Box, Button, TextField } from '@mui/material'
import axios from 'axios'
import React, { useState } from 'react'
import topEuropeanClubs from './topEuropeanClubs'
import filter_input from '../utils/filter_input'
import Loading from './Loading'
import Datagrid from './Datagrid'
// import CombinedOdds from './CombinedOdds'
// import Fixture from './Fixture'
// const Fixture = React.lazy(() => import('./Fixture'))

const Input = () => {

    const existing_session_data = JSON.parse(window.sessionStorage.getItem('fixture'))

    const [teamInput, setTeamInput] = useState()
    const [rows, setRows] = useState(existing_session_data || '')
    const [loading, setLoading] = useState(false)

    const handleClick = async () => {

        setLoading(true)

        const res = await axios.post('https://advice-odds-api.azurewebsites.net/api', {teams: teamInput})
        const fixture = res.data

        let new_session_data = []
        
        if (existing_session_data) {
            new_session_data = fixture && [...existing_session_data, ...fixture]
        } else {
            new_session_data = fixture && [...fixture]
        }

        // Saving data to session storage to hydrate the app
        window.sessionStorage.setItem('fixture', JSON.stringify(new_session_data))

        const session_data = JSON.parse(window.sessionStorage.getItem('fixture'))
        setRows(session_data)
        setLoading(false)
        setTeamInput([])
    }

  return (
    <Box textAlign={'center'}>
        <Box marginBottom={'4em'}>
            <Autocomplete
                sx={{ margin: 'auto', marginBottom: '1em' }}
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
                onChange={(e, tags) => {
                    const team_input = tags
                    const team_input_filtered = filter_input(rows, team_input)
                    setTeamInput(team_input_filtered)
                }}
            />
            <Button variant='contained' color='warning' sx={{minWidth: '50%'}} onClick={handleClick}>Call API</Button>
        </Box>
            { loading 
                ?   <Loading /> : (!rows? 'Select your teams to get advice' 
                :   <Box>
                        {/* <Fixture fixture={rows} /> */}
                        <Datagrid fixture={rows}/>
                    </Box>
            )}
    </Box>
  )
}

export default Input
