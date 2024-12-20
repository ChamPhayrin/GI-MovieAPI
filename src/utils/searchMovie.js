const axios = require('axios')


const searchMovie = async (movieTitle) => {
  const options = {
    method: 'GET',
    url: 'https://api.themoviedb.org/3/search/movie',
    params: {query: movieTitle, include_adult: 'false', language: 'en-US', page: '1'},
    headers: {
      accept: 'application/json',
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzFhNmM4ZWFmOTNhY2JmNjI4Y2NkYmEyNWRjN2VlYSIsIm5iZiI6MTczNDM3MjU0MS43NjcsInN1YiI6IjY3NjA2Y2JkNDVmN2JmNjA3YTFiYzkzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1-FGh7u5VzgM8bPSIrBPn9L_PXW1X7-4K3wK4snnCBk'
    }
  };
  
  return axios
    .request(options)
    .then(res => 
    { 
      if(res.data.results.length == 0) {
        return {error: 'No movie was found'}
      }
      
      const searchedMovie = res.data.results[0]

      return {
      title: searchedMovie.title,
      id: searchedMovie.id,
      poster: `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${searchedMovie.backdrop_path}`,
      overview: searchMovie.overview || 'No overview available.',
      date: searchedMovie.release_date
    }
  }
  )
    .catch(err => console.error(err));
}
module.exports = searchMovie