require('dotenv').config()
const axios = require('axios');

const API_HEADERS = {
    'X-RapidAPI-Key': process.env.API_KEY,
    'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com'
}


const get_advice = async (fixture_id) => {

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/predictions',
        params: {fixture: fixture_id},
        headers: API_HEADERS
    };
    
    try {
        const res = await axios.request(options);
        return res.data.response[0].predictions.advice
    } catch (error) {
        console.error(error);
    }

}


exports.get_team_fixture = async (teamID) => {

    const options = {
        method: 'GET',
        url: 'https://api-football-v1.p.rapidapi.com/v3/fixtures',
        params: {
            season: '2023',
            team: teamID,
            next: '1'
        },
        headers: API_HEADERS
    };
      
    try {
        const res = await axios.request(options);
        const data = res.data.response[0];
        const home_team = data.teams.home.name
        const away_team = data.teams.away.name
        const league = data.league.name
        const fixture_id = data.fixture.id
        const advice = await get_advice(fixture_id)
        return {home_team, away_team, league, advice}
        // console.log([home_team, away_team, league, advice])
    } catch (error) {
        console.error(error);
    }

}