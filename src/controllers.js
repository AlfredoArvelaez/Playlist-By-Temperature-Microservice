const { request, response } = require('express')
const { getTemperatureByCityName, getTemperatureByCoords } = require('./services/temperature')
const { getPlaylistByTemperature } = require('./services/playlist')

const getMusic = async (req = request, res = response) => {
  const { city, lat, lon } = req.query
  let temperature

  if (!city && (!lat || !lon)) {
    return res.status(400).json({ error: 'Invalid query params'})
  }

  if (city) { 
    try {
      temperature = await getTemperatureByCityName(city)
    } catch (err) {
      return res.json({ error: 'Invalid city name' })
    }
  }
  
  if (lat && lon) {
    try {
      temperature = await getTemperatureByCoords(lat, lon)
    } catch (err) {
      return res.json({ error: 'Invalid lat and lon params' })
    }
  }

  const response = await getPlaylistByTemperature(temperature)
  return res.json({ temperature, data: response })
}

module.exports = { getMusic }