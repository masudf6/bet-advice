const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./config/db');
const  { clubs } = require('./utils/teams');
const { runIngestion } = require('./utils/ingestion');

app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.init();

const PORT = process.env.PORT || 3000;

setInterval(async () => {
    const teamIds = clubs.map(club => club.code);
    await runIngestion(teamIds);
    console.log("Ingestion ran successfully")
}, 1000 * 60 * 24); // Run every 24 hours

app.get('/api', (req, res) => {
    res.json({ apiHomeMessage: 'Hello World' })
})

app.post('/api', db.getDataByTeamIds)


app.listen(PORT, () => {
    console.log(`server listening on port ${PORT}`)
})