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
const getMoviesByTitle = query =>
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

const getPopularMovies = () =>
    fetch(`${movieApiUrl}/popular?api_key=${apiKey}`)
        .then(response => response.json())
        .then(jsonRes => jsonRes.results)
        .then(results =>
            results.map(result => ({
                ...result,
                poster_path: `${createFullImageUrl(result.poster_path)}`,
            }))
        );

// Loading and showing 10 most popular movies before user starts searching
// for specific ones by title.
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const popularMovies = await getPopularMovies();
        localStorage.setItem("movie", JSON.stringify(popularMovies));
        const popMoviesView = document.getElementById("popularMovieList");

        popularMovies.slice(0, 10).forEach((movie, i) => {
            // console.log("movie.poster_path}", movie.poster_path);
            // console.log(movie);

            const item = document.createElement("li");

            item.innerHTML = `
            <img src=${
                movie.poster_path
            } alt="movie poster" class="w-full rounded-[3rem] shadow-lg ] cursor-pointer"/>
            <div class="movie_info_text mt-[7px] pl-[2rem">
            <h4 class="text-[1.4rem] md:text-[1.6rem]">${movie.title}</h4>

            <span class="vote" >⭐️ ${movie.vote_average.toFixed(1)}</span>
            <span class="realese_date">| ${
                movie.release_date.split("-")[0]
            }</span>

            </div>
               <button class="w-[80%] mt-[1rem] py-[5px] px-[2rem] text-[1.4rem] bg-[#020F1D] rounded-full">+ Add to favorites</button>
            `;
            item.classList.add(
                "movie",
                `movie_${i + 1}`,
                "flex",
                "flex-col",
                "justify-between"
            );
            popMoviesView.appendChild(item);
        });

        const favButtons = document.querySelectorAll("button");
        favButtons.forEach(button =>
            button.addEventListener("click", function () {
                const favMovie = this.parentElement;
                console.log(favMovie.children);
                const favmovieClass = favMovie.classList[1];
                console.log(favmovieClass);

                const favMovieObj = {
                    imgSrc: document.querySelector(`.${favmovieClass} img`).src,
                    title: document.querySelector(`.${favmovieClass} h4`)
                        .textContent,
                    votes: document.querySelector(`.${favmovieClass} .vote`)
                        .textContent,
                    realeaseDate: document.querySelector(
                        `.${favmovieClass} .realese_date`
                    ).textContent,
                };
                console.log(favMovieObj);
                const favList =
                    JSON.parse(localStorage.getItem("favList")) || [];
                const localStorageFavList = JSON.parse(
                    localStorage.getItem("favList")
                );
                if (!favList.some((e) => e.title === favMovieObj.title)) {
                    favList.push(favMovieObj);

                    localStorage.setItem("favList", JSON.stringify(favList));
                } 
                else {
                    console.log('Already added to favorite')
                }

                console.log(JSON.parse(localStorage.getItem("favList")));
            })
        );
    } catch (error) {
        console.error(error);
    }
});

//updating and showing user's search results
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const searchInputView = document.getElementById("searchInput");
        searchInputView.addEventListener("change", async event => {
            const userSearchText = event.target.value;
            console.log("user is searching for", userSearchText);

            const titleOfMovie = await getMoviesByTitle(userSearchText);
            const searchBarResult = document.getElementById("searchResults");
            // reset search results
            searchBarResult.innerHTML = "";

            console.log(titleOfMovie);
            titleOfMovie.forEach(movie => {
                console.log("movie.poster_path}", movie.poster_path);

                const item = document.createElement("li");
                item.textContent = movie.original_title;
                item.style = `background-position: center; background-repeat: no-repeat; background-size: contain; color: white; background-image: url('${movie.poster_path}'); width: 100px; height: 100px`;
                searchBarResult.appendChild(item);
            });
        });
    } catch (error) {
        console.error(error);
    }
});
