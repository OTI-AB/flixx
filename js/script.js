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

async function getTMDBData(endpoint) {
	const API_KEY = '894794e35b50d506b0c2602faad70632';
	const API_URL = 'https://api.themoviedb.org/3/';

	const response = await fetch(
		`${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
	);

	const data = await response.json();
	return data;
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
			console.log('TV Shows');
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
