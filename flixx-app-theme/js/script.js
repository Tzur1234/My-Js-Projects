

const global = {
    currentUrl : window.location.pathname
}

// General fetch function form TMBD API
async function fetchData(url){
    // Spinner
    showSpinner()
    
    // credenentials
    API_KEY = '1bcda823c623f469eb606c40d700de42'
    BASE_URL_PATH = 'https://api.themoviedb.org/3'

    FINAL_URL = `${BASE_URL_PATH}/${url}?api_key=${API_KEY}&language=en-US&page=1`

    const res = await fetch(FINAL_URL);
    const data = await res.json()
    
    
    hideSpinner()
    return data
}

async function displayPopularMovies() {
    // fetch the data
    let movies = await fetchData('/movie/popular')
    movies = movies.results
    console.log(movies)
    // show the data
    movies.forEach(movie => {
        // create div-card
        const div = document.createElement('div')
        div.className = 'card'
        div.innerHTML = `
        
          <a href="movie-details.html?id=${movie.id}">
            <img
            src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `./flixx-app-theme/images/no-image.jpg`  }"

            class="card-img-top"
            alt="${movie.title}"
            />    
          </a>
          <div class="card-body">
            <h5 class="card-title">${movie.title}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${movie.release_date}</small>
            </p>
          </div>
        `
        // insert HTML to the div card
        document.getElementById('popular-movies').appendChild(div)
    }); 
}

async function displayPopularTvShows() {
    // fetch the data
    let shows = await fetchData('/tv/popular')
    shows = shows.results
    console.log(shows)
    // show the data
    shows.forEach(show => {
        // create div-card
        const div = document.createElement('div')
        div.className = 'card'
        div.innerHTML = `
        
        <a href="tv-details.html?id=${show.id}">
        <img
          src="${
            show.poster_path ? `https://image.tmdb.org/t/p/w500${show.poster_path}`
            : `flixx-app-theme/images/no-image.jpg`}"
          class="card-img-top"
          alt="Show Title"
        />
      </a>
      <div class="card-body">
        <h5 class="card-title">${show.name}</h5>
        <p class="card-text">
          <small class="text-muted">Aired: ${show.first_air_date}</small>
        </p>
      </div>
        `
        // insert HTML to the div card
        document.getElementById('popular-shows').appendChild(div)
    }); 
}


// Highlight active link
function highlightActiveLink(){
    links = document.querySelectorAll('.nav-link')
    links.forEach(link => {
        if(link.getAttribute('href') === global.currentUrl){
            link.classList.add('active')
        }
    })
}


function showSpinner(){
    document.querySelector('.spinner').classList.add('show')
}

function hideSpinner(){
    document.querySelector('.spinner').classList.remove('show')

}



// follow page 
function init(){
    switch(global.currentUrl) {
        case '/flixx-app-theme/index.html':
        case '/flixx-app-theme/':
            console.log('home')
            displayPopularMovies();             
            break;
        case '/flixx-app-theme/shows.html':
            console.log('show')
            displayPopularTvShows()
            break;
        case '/flixx-app-theme/movie-details.html':
            console.log('movie-details');
            break;
        case '/flixx-app-theme/tv-details.html':
            console.log('tv-details');
            break;
        case '/flixx-app-theme/search.html':
        console.log('search');
            break; 

    }

    // hightlight things
    highlightActiveLink()
}

init()
s