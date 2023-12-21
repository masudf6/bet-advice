const express = require('express');
const app = express();
const cors = require('cors');
const controller = require('./Controller')
const get_fixture = require('./get_fixture')

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

app.get('/api', (req, res) => {
    res.json({ apiHomeMessage: 'Hello World' })
})

app.post('/api', async (req, res) => {

    const teams = req.body.teams
    const teamIds = teams.map(team => team.code)
    let fixture = []
    for (let id of teamIds) {
        fixture.push(await get_fixture.get_team_fixture(id))
    }
    console.log(fixture)
    res.json(fixture)

})


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})