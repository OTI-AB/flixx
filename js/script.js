const globaState = {
	currentPage: window.location.pathname,
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

async function displayPopularTVShows() {
	const { results } = await getTMDBData('tv/popular');

	results.forEach((tv) => {
		console.log(tv);
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

async function getTMDBData(endpoint) {
	const API_KEY = '894794e35b50d506b0c2602faad70632';
	const API_URL = 'https://api.themoviedb.org/3/';

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
		if (link.getAttribute('href') === globaState.currentPage) {
			link.classList.add('active');
		}
	});
}

function init() {
	switch (globaState.currentPage) {
		case '/':
		case '/index.html':
			displayPopularMovies();
			break;
		case '/shows.html':
			displayPopularTVShows();
			break;
		case '/movie-details.html':
			console.log('Movie Details');
			break;
		case '/tv-details.html':
			console.log('Tv Details');
			break;
		case '/search.html':
			console.log('Search Page');
			break;
	}
	highlightActiveLink();
}

document.addEventListener('DOMContentLoaded', init);
