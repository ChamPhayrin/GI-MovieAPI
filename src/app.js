// NPM MODLES
const path = require('path')
const express = require('express');
const hbs = require('hbs')
const similarMovies = require('./utils/similarMovies')
const searchMovie = require('./utils/searchMovie')

// Express NPM
const app = express();

// LOCAL HOST PORT
const port= process.env.PORT || 3000

// PATHING
let publicDirectory = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// SET UP HANDLE BARS AND VIEWS LOCATION 
app.set('views',viewsPath)
app.set('view engine', 'hbs')
hbs.registerPartials(partialsPath)

// SET UP STATIC DIRECTORY TO SERVE
app.use(express.static(publicDirectory))


//send to pages
app.get('/', (req, res) =>{
  res.render('index', {
    title: 'MovieMatch V2',
  })
})

app.get('/search', (req, res) =>{
  let movie = req.query.movie

  if(!movie){
    return res.send({
      errorMessage: 'Please search for a movie'
    })}

  searchMovie(movie).then(movie => {
    if(movie.error) {
      return res.send({
        errorMessage: 'Movie ID not found'
      })
    }
    similarMovies(movie.id).then(movies => {
      return res.send({
        searchedMovie: movie,
        reccomendedMovies: movies
      })
    })
  });
})

// CHECK SERVER IS UP
app.listen(port, ()=>{
  console.log('server is up!')
})
