console.log('Client side Js online!')

const searchbar = document.getElementById('search-form-input')

searchbar.addEventListener('keyup', (e) => {
  e.preventDefault();

  if (e.key === "Enter") {
    e.stopPropagation();
  }

  // MOVIE DOM VARIABLES
  const movieCard = document.getElementById('movie-card')
  const movieError = document.getElementById('movie-error')
  const movieErrorTitle = document.getElementById('movie-error-title')
  const movieErrorParagraph = document.getElementById('movie-error-paragraph')
  const reccomended = document.getElementById('reccomended')
  const reccomendedContainer = document.getElementById('reccomended-list')
  let movie = searchbar.value.trim()


  if(movie.length ===  0){
    movieErrorTitle.innerHTML = `<dotlottie-player src="https://lottie.host/6a988696-70de-488f-915f-d186dfdea36c/ZWiRliEU9u.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>`
    movieCard.classList.add('hidden')
    reccomended.classList.add('hidden')
  }

  movieError.classList.remove('hidden')
  // removing previous results
  movieErrorTitle.innerHTML = `<dotlottie-player src="https://lottie.host/6a988696-70de-488f-915f-d186dfdea36c/ZWiRliEU9u.lottie" background="transparent" speed="1" style="width: 300px; height: 300px" loop autoplay></dotlottie-player>`
  reccomendedContainer.innerHTML = ''


  if(!movie){
    movieErrorTitle.innerHTML = 'Please enter movie'
    return
  }

  fetch(`http://localhost:3000/search?movie=${movie}`).then((res) =>{
    res.json().then(data  => {

      if(data.errorMesssage){
        movieCard.classList.add('hidden')
        movieError.classList.remove('hidden')
        movieErrorParagraph.innerHTML = data.errorMesssage
        return
      } else {
        movieCard.classList.remove('hidden')
        movieError.classList.add('hidden')
        reccomended.classList.remove('hidden')

        movieCard.innerHTML = `
        <div id="movie-card-content">
          <h4 id="movie-title">${data.searchedMovie.title}</h4>
          <p id="movie-date">${data.searchedMovie.date}</p>
          <p id="movie-overview">${data.searchedMovie.overview}</p>
        </div>
        `
        movieCard.style.backgroundImage = `url('${data.searchedMovie.poster}')`;


        for(const movie of data.reccomendedMovies){
          const li = document.createElement('li')
          li.classList.add('reccomended-list-container')
          li.innerHTML = `
          <div class="movie">
              <div class="movie-hero">
                <img src="${movie.poster}" alt="Rambo" class="movie-img">
              </div>
              <div class="movie-content">
                <div class="movie-title">
                  <h4>${movie.title}</h4>
                </div>
                  <p class="movie-date">${movie.date}</p>
                  <p class="movie-overview">
                    ${movie.overview}
                  </p>
              </div> 
            </div>`
            reccomendedContainer.appendChild(li)
        }

      }


    })
  })

})


