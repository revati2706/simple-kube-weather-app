require('dotenv').config();
const express = require('express');
const axios = require('axios');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.static('public'));

app.get('/weather', async (req, res) => {
  const { lat, lon } = req.query;
  const apiKey = process.env.API_KEY;

  try {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather`, {
      params: {
        lat,
        lon,
        units: 'metric',
        appid: apiKey
      }
    });
    res.json(response.data);
  } catch (error) {
    res.status(500).send("Error fetching weather");
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
