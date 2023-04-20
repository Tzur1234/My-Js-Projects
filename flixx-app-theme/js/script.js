

const global = {
    currentUrl : window.location.pathname,
    search: {
      term: '',
      type: '',
      page: 1,
      totalPages: 1
    },
    api : {
      key : '1bcda823c623f469eb606c40d700de42',
      url_path: 'https://api.themoviedb.org/3'

    }
}

// General fetch function form TMBD API
async function fetchData(url){
    // Spinner
    showSpinner()
    
    // credenentials
    API_KEY = global.api.key
    BASE_URL_PATH = global.api.url_path

    FINAL_URL = `${BASE_URL_PATH}/${url}?api_key=${API_KEY}&language=en-US&page=1`

    const res = await fetch(FINAL_URL);
    const data = await res.json()
        
    hideSpinner()
    return data
}

// General fetch function form TMBD API
async function fetchAPIData(){
  // Spinner
  showSpinner()
  
  // credenentials
  API_KEY = global.api.key
  BASE_URL_PATH = global.api.url_path

  FINAL_URL = `${BASE_URL_PATH}/search/${global.search.type}?api_key=${API_KEY}&language=en-US&page=1&include_adult=false&query=${global.search.term}`



  const res = await fetch(FINAL_URL);
  const data = await res.json()
  
  
  hideSpinner()
  return data
}

// serarch movies/shows 
async function search(){
  const queryString = window.location.search
    
  const urlParams = new URLSearchParams(queryString)
  
  // set url parameters in the global scope veriabels
  global.search.term = urlParams.get('search-term')
  global.search.type = urlParams.get('type')


  // validation for not empty
  if(global.search.term !== '' && global.search.term !== null){
    const {results, total_pages, page} = await fetchAPIData();

    // insert in the DOM
    displaySearchResults(results)

  }
  else{
    showAlert('You must fill the search field', 'error')
  }  

  // clean the search bar
  document.querySelector('#search-term').value = ''
  
  
  movie_data = await fetchData(`/movie/${movie_id}`)
}

// Show movies/tv-shows results
function displaySearchResults(results){

  if(results.length === 0){
    showAlert('No results', 'error')
    return;
  }

  results.forEach(result => {
    let card = document.createElement('div')
    card.classList.add('card')
    card.innerHTML = 
      
    `<a href="${global.search.type === 'movie' ? `movie-details.html?id=${result.id}` :`tv-details.html?id=${result.id}`}">
          <img src="${
                      result.poster_path ? `https://image.tmdb.org/t/p/w500${result.poster_path}`
                      : `./images/no-image.jpg` 
                    }"
          }" class="card-img-top" alt="${global.search.type === 'movie' ? result.title : result.name}">
        </a>
          <div class="card-body">
            <h5 class="card-title">${global.search.type === 'movie' ? result.title : result.name}</h5>
            <p class="card-text">
              <small class="text-muted">Release: ${result.release_date}</small>
            </p>
          </div>`
 
    // append to DOM
    document.getElementById('search-results').appendChild(card)
  });




}


async function displayPopularMovies() {
    // fetch the data
    let movies = await fetchData('/movie/popular')
    movies = movies.results
   
    // set the data in the DOM
    movies.forEach(movie => {
        // create div-card
        const div = document.createElement('div')
        div.className = 'card'
        div.setAttribute('data-id', movie.id)
        div.innerHTML = `
        
          <a href="movie-details.html?id=${movie.id}">
            <img
            src="${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : `./images/no-image.jpg`  }"

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
            : `./images/no-image.jpg`}"
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

// Display Backdrop On Details Pages
function displayBackgroundImage(type, backgroundPath) {
    const overlayDiv = document.createElement('div');
    overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${backgroundPath})`;
    overlayDiv.style.backgroundSize = 'cover';
    overlayDiv.style.backgroundPosition = 'center';
    overlayDiv.style.backgroundRepeat = 'no-repeat';
    overlayDiv.style.height = '100vh';
    overlayDiv.style.width = '100vw';
    overlayDiv.style.position = 'absolute';
    overlayDiv.style.top = '0';
    overlayDiv.style.left = '0';
    overlayDiv.style.zIndex = '-1';
    overlayDiv.style.opacity = '0.1';

    if (type === 'movie') {
        document.querySelector('#movie-details').appendChild(overlayDiv);
      } else {
        document.querySelector('#show-details').appendChild(overlayDiv);
      }

}

async function displayMovieDetail() {

    // fetch the movie id from the url
    const queryString = window.location.search
    
    const urlParams = new URLSearchParams(queryString)
    
    let movie_id = urlParams.get('id')
    
    
    movie_data = await fetchData(`/movie/${movie_id}`)
    
    
    // Overlay for background image
    displayBackgroundImage('movie', movie_data.backdrop_path);



    document.getElementById('movie-details').innerHTML = `
    <div class="details-top">
    <div>
      <img
        src="${
            movie_data.backdrop_path ? `https://image.tmdb.org/t/p/w500${movie_data.backdrop_path}`
            : `./images/no-image.jpg` 
        }"
        class="card-img-top"
        alt="${movie_data.title}"
      />
    </div>
    <div>
      <h2>${movie_data.title}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${Math.round(movie_data.vote_average)} / 10
      </p>
      <p class="text-muted">Release Date: ${movie_data.release_date}</p>
      <p>
      ${movie_data.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${ movie_data.genres.map((genre) => `<li> ${genre.name} </li>`).join(' ')}
      </ul>
      <a href="${movie_data.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Movie Info</h2>
    <ul>
      <li><span class="text-secondary">Budget:</span> $ ${movie_data.budget.toLocaleString("en-US")}</li>
      <li><span class="text-secondary">Revenue:</span> $ ${movie_data.revenue.toLocaleString("en-US")}</li>
      <li><span class="text-secondary">Runtime:</span> ${movie_data.runtime} minutes</li>
      <li><span class="text-secondary">Status:</span> ${movie_data.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">
    ${ movie_data.production_companies.map((comp) => ` ${comp.name}, `).join(' ')}
    </div>
  </div>
    `
}

// show details
async function displayShowDetails(){

    // fetch show id
    const queryString = window.location.search
    
    const urlParams = new URLSearchParams(queryString)
    
    show_id = urlParams.get('id')

    // fetch the data
    show_data = await fetchData(`/tv/${show_id}`)

    // add to the DOM
    document.querySelector('#show-details').innerHTML = `
    <div class="details-top">
    <div>
      <img
      src="${
            show_data.backdrop_path ? `https://image.tmdb.org/t/p/w500${show_data.backdrop_path}`
        : `./images/no-image.jpg` 
            }"
        class="card-img-top"
        alt="${show_data.name}"
      />
    </div>
    <div>
      <h2>${show_data.name}</h2>
      <p>
        <i class="fas fa-star text-primary"></i>
        ${Math.round(show_data.vote_average)} / 10
      </p>
      <p class="text-muted">Release Date:  ${show_data.first_air_date}</p>
      <p>
      ${show_data.overview}
      </p>
      <h5>Genres</h5>
      <ul class="list-group">
      ${ show_data.genres.map((genre) => `<li> ${genre.name} </li>`).join(' ')}
      </ul>
      <a href="${show_data.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
    </div>
  </div>
  <div class="details-bottom">
    <h2>Show Info</h2>
    <ul>
      <li><span class="text-secondary">Number Of Episodes:</span> ${show_data.number_of_episodes}</li>
      <li>
        <span class="text-secondary">Last Episode To Air: ${show_data.last_episode_to_air.name}</span> 
   
      </li>
      <li><span class="text-secondary">Status:</span> ${show_data.status}</li>
    </ul>
    <h4>Production Companies</h4>
    <div class="list-group">C${ show_data.production_companies.map((comp) => `${comp.name},`).join(' ')}</div>
  </div>
    `

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

// Display Slider Movies
async function displaySlider() {
  const { results } = await fetchData('movie/now_playing');

  results.forEach((movie) => {
    const div = document.createElement('div');
    div.classList.add('swiper-slide');

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;

    document.querySelector('.swiper-wrapper').appendChild(div);

    initSwiper();
  });
}

function initSwiper() {
  const swiper = new Swiper('.swiper', {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// showAlert
function showAlert(message, className){
  // create alert div element
  div = document.createElement('div')
  div.classList.add('alert', className)
  div.appendChild(document.createTextNode(message))
  document.querySelector('#alert').appendChild(div)

  setTimeout(() => div.remove(), 3000)
}

// follow page 
function init(){
    switch(global.currentUrl) {
        case '/flixx-app-theme/index.html':
        case '/flixx-app-theme/':
            console.log('home')
            displaySlider();
            displayPopularMovies();             
            break;
        case '/flixx-app-theme/shows.html':
            console.log('show')
            displayPopularTvShows()
            break;
        case '/flixx-app-theme/movie-details.html':
            displayMovieDetail()
            console.log('movie-details');
            break;
        case '/flixx-app-theme/tv-details.html':
            displayShowDetails()
            console.log('tv-details');
            break;
        case '/flixx-app-theme/search.html':
            search()
            console.log('search');
            break; 

    }

    // hightlight things
    highlightActiveLink()
}

init()
