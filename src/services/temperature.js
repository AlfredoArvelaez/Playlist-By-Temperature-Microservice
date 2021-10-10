const axios = require('axios').default

const kelvinToCelsiusConvertor = kelvin => kelvin - 273.15

const getTemperatureByCityName = async (cityName) => {
  try {
    const result = await axios(`http://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.OPENWEATHER_API_KEY}`)
    const temperature = kelvinToCelsiusConvertor(result.data?.main.temp)

    return temperature
    
  } catch (err) {
    throw new Error('Error in getTemperatureByCityName function')
  }
}

const getTemperatureByCoords = async (lat, lon) => {
  try {
    const result = await axios(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${process.env.OPENWEATHER_API_KEY}`)
    const temperature = kelvinToCelsiusConvertor(result.data?.main.temp)

    return temperature
  } catch(err) {
    throw new Error('Error in getTemperatureByCoords function')
  }
}

module.exports = {
  getTemperatureByCityName,
  getTemperatureByCoords
}