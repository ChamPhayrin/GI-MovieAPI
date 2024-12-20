const axios = require("axios");

const similarMovies = async (movieID) => {
	const options = {
		method: "GET",
		url: `https://api.themoviedb.org/3/movie/${movieID}/recommendations`,
		params: { language: "en-US", page: "1" },
		headers: {
			accept: "application/json",
			Authorization:
				"Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzMzFhNmM4ZWFmOTNhY2JmNjI4Y2NkYmEyNWRjN2VlYSIsIm5iZiI6MTczNDM3MjU0MS43NjcsInN1YiI6IjY3NjA2Y2JkNDVmN2JmNjA3YTFiYzkzYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1-FGh7u5VzgM8bPSIrBPn9L_PXW1X7-4K3wK4snnCBk",
		},
	};

	return axios
		.request(options)
		.then((res) => {
			const allMovies = res.data.results;
			let reccomended = [];

			for (const movie of allMovies) {
				reccomended.push({
					title: movie.title,
					poster: `https://media.themoviedb.org/t/p/w1066_and_h600_bestv2${movie.backdrop_path}`,
					overview: movie.overview,
					date: movie.release_date,
				});
			}
			return reccomended;
		})
		.catch((err) => console.error(err));
};
module.exports = similarMovies;
