const globalState = {
	currentPage: window.location.pathname,
	search: {
		term: '',
		type: '',
		page: 1,
		totalPages: 1,
	},
	api: {
		apiKey: '894794e35b50d506b0c2602faad70632',
		apiUrl: 'https://api.themoviedb.org/3/',
	},
};

async function displayPopularMovies() {
	const { results } = await getTMDBData('movie/popular');

	results.forEach((movie) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `<a href="movie-details.html?id=${movie.id}">
		${
			movie.poster_path
				? `<img
			src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
			class="card-img-top"
			alt="${movie.title}"
		/>`
				: `<img
		src="../images/no-image.jpg"
		class="card-img-top"
		alt="${movie.title}"
	/>`
		}
	</a>
	<div class="card-body">
		<h5 class="card-title">${movie.title}</h5>
		<p class="card-text">
			<small class="text-muted">Release: ${movie.release_date}</small>
		</p>
	</div>
`;

		document.querySelector('#popular-movies').appendChild(div);
	});
}

async function displayMovieDetails() {
	const movie_id = window.location.search.split('=')[1];

	const movie = await getTMDBData(`movie/${movie_id}`);

	addBackdrop('movie', movie.backdrop_path);

	const div = document.createElement('div');

	div.innerHTML = `<div class="details-top">
	<div>
	${
		movie.poster_path
			? `<img
		src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
		class="card-img-top"
		alt="${movie.title}"
	/>`
			: `<img
	src="../images/no-image.jpg"
	class="card-img-top"
	alt="${movie.title}"
/>`
	} 
	</div>
	<div>
		<h2>${movie.title}</h2>
		<p>
			<i class="fas fa-star text-primary"></i>
			${movie.vote_average.toFixed(1)} / 10
		</p>
		<p class="text-muted">Release Date: ${movie.release_date}</p>
		<p>
			${movie.overview}
		</p>
		<h5>Genres</h5>
		<ul class="list-group">
			${movie.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
		</ul>
		<a href="${movie.homepage}" target="_blank" class="btn">Visit Movie Homepage</a>
	</div>
</div>
<div class="details-bottom">
	<h2>Movie Info</h2>
	<ul>
		<li><span class="text-secondary">Budget: $</span> ${
			movie.budget ? `${movie.budget.toLocaleString()}` : `Unavailable`
		} </li>
		<li><span class="text-secondary">Revenue: $</span> ${
			movie.revenue ? `${movie.revenue.toLocaleString()}` : `Unavailable`
		} </li>
		<li><span class="text-secondary">Runtime:</span> ${movie.runtime} minutes</li>
		<li><span class="text-secondary">Status:</span> ${movie.status}</li>
	</ul>
	<h4>Production Companies</h4>
	<div class="list-group">${movie.production_companies
		.map((company) => `<li>${company.name}</li>`)
		.join('')}</div>
</div>
`;
	document.getElementById('movie-details').appendChild(div);
}

async function displayShowDetails() {
	const show_id = window.location.search.split('=')[1];

	const show = await getTMDBData(`tv/${show_id}`);

	addBackdrop('show', show.backdrop_path);

	const div = document.createElement('div');

	div.innerHTML = `<div class="details-top">
	<div>${
		show.poster_path
			? `<img
		src="https://image.tmdb.org/t/p/w500${show.poster_path}"
		class="card-img-top"
		alt="${show.name}"
	/>`
			: `<img
	src="../images/no-image.jpg"
	class="card-img-top"
	alt="${show.name}"
/>`
	} 
	</div>
	<div>
		<h2>${show.name}</h2>
		<p>
			<i class="fas fa-star text-primary"></i>
			${show.vote_average.toFixed(1)} / 10
		</p>
		<p class="text-muted">Release Date: ${show.first_air_date}</p>
		<p>
			${show.overview}
		</p>
		<h5>Genres</h5>
		<ul class="list-group">
		${show.genres.map((genre) => `<li>${genre.name}</li>`).join('')}
		</ul>
		<a href="${show.homepage}" target="_blank" class="btn">Visit Show Homepage</a>
	</div>
</div>
<div class="details-bottom">
	<h2>Show Info</h2>
	<ul>
		<li><span class="text-secondary">Number Of Episodes:</span> ${
			show.number_of_episodes
		} over ${show.number_of_seasons} Seasons</li>
		<li><span class="text-secondary">Languages: ${show.spoken_languages
			.map((language) => `<li>${language.name}</li>`)
			.join('')}
		<li>
			<span class="text-secondary">Last Episode To Air:</span> ${
				show.last_episode_to_air.name
			}
		</li>
		<li><span class="text-secondary">Status:</span> ${show.status}</li>
	</ul>
	<h4>Production Companies</h4>
	<div class="list-group">${show.production_companies
		.map((company) => `<li>${company.name}</li>`)
		.join('')}</div>
</div>
</div>
`;
	document.getElementById('show-details').appendChild(div);
}

async function displayPopularTVShows() {
	const { results } = await getTMDBData('tv/popular');

	results.forEach((tv) => {
		const div = document.createElement('div');
		div.classList.add('card');
		div.innerHTML = `<a href="tv-details.html?id=${tv.id}">
				${
					tv.poster_path
						? `<img
					src="https://image.tmdb.org/t/p/w500${tv.poster_path}"
					class="card-img-top"
					alt="${tv.name}"
				/>`
						: `<img
				src="../images/no-image.jpg"
				class="card-img-top"
				alt="${tv.name}"
			/>`
				}
			</a>
			<div class="card-body">
				<h5 class="card-name">${tv.name}</h5>
				<p class="card-text">
					<small class="text-muted">First Air: ${tv.first_air_date}</small>
				</p>
				<p class="card-text">
					<small class="text-muted">Language: ${tv.original_language}</small>
				</p>
			</div>
		`;
		document.querySelector('#popular-shows').appendChild(div);
	});
}

function addBackdrop(type, backgoundPath) {
	const overlayDiv = document.createElement('div');
	overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${backgoundPath})`;
	overlayDiv.style.backgroundSize = 'cover';
	overlayDiv.style.backgroundPosition = 'center';
	overlayDiv.style.backgroundRepeat = 'no-repeat';
	overlayDiv.style.height = '100vh';
	overlayDiv.style.width = '100vw';
	overlayDiv.style.position = 'absolute';
	overlayDiv.style.top = '0';
	overlayDiv.style.left = '0';
	overlayDiv.style.zIndex = '-1';
	overlayDiv.style.opacity = '0.2';

	if (type === 'movie') {
		document.querySelector('#movie-details').appendChild(overlayDiv);
	} else {
		document.querySelector('#show-details').appendChild(overlayDiv);
	}
}

async function search() {
	const queryString = window.location.search;
	const urlParams = new URLSearchParams(queryString);

	globalState.search.type = urlParams.get('type');
	globalState.search.term = urlParams.get('search-term');

	if (globalState.search.term !== '' && globalState.search.term !== null) {
		const results = await searchAPIData();
		console.log(results.valueOf());
	} else {
		showAlert('You must include a search term');
	}
}

async function displaySlider() {
	const { results } = await getTMDBData('movie/now_playing');

	results.forEach((result) => {
		const div = document.createElement('div');
		div.classList.add('swiper-slide');

		div.innerHTML = `
		<a href="movie-details.html?id=${result.id}">
		<img src="https://image.tmdb.org/t/p/w500${result.poster_path}" alt="${
			result.title
		}" />
		</a>
		<h4 class="swiper-rating>
		<i class="fas fa-star text-secondary"></i> ${result.vote_average.toFixed(
			1
		)} / 10
		</h4>`;

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
			750: {
				slidesPerView: 3,
			},
			1200: {
				slidesPerView: 4,
			},
		},
	});
}

async function searchAPIData() {
	const API_KEY = globalState.api.apiKey;
	const API_URL = globalState.api.apiUrl;

	showSpinner();

	const response = await fetch(
		`${API_URL}search/${globalState.search.type}?query=${globalState.search.term}&api_key=${API_KEY}&language=en-US`
	);

	const data = await response.json();

	hideSpinner();

	return data;
}

function showSpinner() {
	document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
	document.querySelector('.spinner').style.display = 'none';
}

function highlightActiveLink() {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === globalState.currentPage) {
			link.classList.add('active');
		}
	});
}

async function getTMDBData(endpoint) {
	const API_KEY = globalState.api.apiKey;
	const API_URL = globalState.api.apiUrl;

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);

	showSpinner();

	const data = await response.json();

	hideSpinner();

	return data;
}

function showSpinner() {
	document.querySelector('.spinner').style.display = 'block';
}

function hideSpinner() {
	document.querySelector('.spinner').style.display = 'none';
}

function highlightActiveLink() {
	const links = document.querySelectorAll('.nav-link');
	links.forEach((link) => {
		if (link.getAttribute('href') === globalState.currentPage) {
			link.classList.add('active');
		}
	});
}

function showAlert(message, className) {
	const alertEl = document.createElement('div');
	alertEl.classList.add('alert', className);
	alertEl.appendChild(document.createTextNode(message));
	document.querySelector('#alert').appendChild(alertEl);

	setTimeout(() => alertEl.remove(), 3000);
}

function init() {
	switch (globalState.currentPage) {
		case '/':
		case '/index.html':
			displaySlider();
			displayPopularMovies();
			break;
		case '/shows.html':
			displayPopularTVShows();
			break;
		case '/movie-details.html':
			displayMovieDetails();
			break;
		case '/tv-details.html':
			displayShowDetails();
			break;
		case '/search.html':
			search();
			break;
	}
	highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
