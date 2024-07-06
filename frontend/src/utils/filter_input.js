
const filter_input = (rows, team_input)=> {
    const row_home_codes = rows && rows.map(row => Number(row.home_team_id))
    const row_away_codes = rows && rows.map(row => Number(row.away_team_id))

    const row_codes = [...row_home_codes, ...row_away_codes]
    const input_codes = team_input.map(team => team.code)

    return input_codes.filter(input_code => !row_codes.includes(input_code))
}

export default filter_input