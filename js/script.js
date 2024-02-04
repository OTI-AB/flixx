const globaState = {
	currentPage: window.location.pathname,
};

async function getTMDBData(endpoint) {
	const API_KEY = '894794e35b50d506b0c2602faad70632';
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
			console.log('Home');
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
