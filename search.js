const baseUrl = "https://api.themoviedb.org/3";
const imageApiUrl = "https://image.tmdb.org/t/p";
const searchApiUrl = `${baseUrl}/search`;
const movieApiUrl = `${baseUrl}/movie`;

const apiKey = "6264e1bd33911f19968a6fa2c2cb0d55";

// full image url so that css can be applied
const createFullImageUrl = (apiImagePath, width) =>
    `${imageApiUrl}/w${width ? width : "500"}${apiImagePath}`;

// task is asking for a display of popular movies and the use of a search bar
// so making two fetch requests accordingly
export const getMoviesByTitle = query =>
    fetch(
        `${searchApiUrl}/movie?query=${encodeURIComponent(
            query
        )}&api_key=${apiKey}`
    )
        .then(response => response.json())
        .then(jsonRes => jsonRes.results)
        .then(results =>
            results.map(result => ({
                ...result,
                poster_path: `${createFullImageUrl(result.poster_path)}`,
            }))
        );

export const getPopularMovies = () =>
    fetch(`${movieApiUrl}/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(jsonRes => jsonRes.results)
        .then(results =>
            results.map(result => ({
                ...result,
                poster_path: `${createFullImageUrl(result.poster_path)}`,
            }))
        );
