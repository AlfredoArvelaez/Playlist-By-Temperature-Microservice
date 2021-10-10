const axios = require('axios').default

// Playlist Selector by temperature
const genreSelectorByTemperature = (temp) => {
  if (!temp) return

  const temperature = parseFloat(temp.toFixed(2))

  if (temperature > 30) return "party"
  if (temperature >= 15 && temperature <= 30) return "pop"
  if (temperature >= 10 && temperature <= 14) return "rock"
  if (temperature <= 9) return "classical"
}

const getPlaylistByGenre = async (genre) => {
  try {
    const result = await axios(`https://ws.audioscrobbler.com/2.0/?method=tag.gettoptracks&tag=${genre}&api_key=${process.env.LASTFM_API_KEY}&format=json`)

    const fullDataPlaylist = result.data?.tracks.track
    const onlyTrackNames = fullDataPlaylist.map(track => track.name)

    return onlyTrackNames
    
  } catch(err) {
    throw new Error('Error in getPlaylistByGenre function')
  }
}

const getPlaylistByTemperature = async (temp) => {
  const genre = genreSelectorByTemperature(temp)
  const playlist = await getPlaylistByGenre(genre)

  return playlist
}

module.exports = {
  getPlaylistByGenre,
  getPlaylistByTemperature
}
