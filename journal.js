
const movie2 = JSON.parse(localStorage.getItem('movie'))
console.log(movie2)
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const popularMovies = await movie2;
        const popMoviesView = document.getElementById("favMovieList");
        popularMovies.forEach(movie => {
            console.log("movie.poster_path", movie.poster_path);
            console.log(movie);

            const item = document.createElement("li");

            item.innerHTML = `
            <a href="#"><img src="${movie.poster_path}" alt="movie poste" class="w-full rounded-[3rem] shadow-lg"/></a>
            <div class="mt-[7px] pl-[2rem]">
            <h4 class="text-[1.4rem] md:text-[1.6rem]">${movie.title}</h4>

            <span>⭐️ ${movie.vote_average.toFixed(1)}</span>
            <span>| ${movie.release_date.split("-")[0]}</span>
            </div>
            `;
            item.classList.add("flex", "flex-col", "justify-between");
            popMoviesView.appendChild(item);
        });
    } catch (error) {
        console.error(error);
    }
});

function card() {
    return `
            <a href="#"><img src=${
                movie.poster_path
            } alt="movie poste" class="w-full rounded-[3rem] shadow-lg"/></a>
            <div class="mt-[7px] pl-[2rem]">
            <h4 class="text-[1.4rem] md:text-[1.6rem]">${movie.title}</h4>

            <span>⭐️ ${movie.vote_average.toFixed(1)}</span>
            <span>| ${movie.release_date.split("-")[0]}</span>
            </div>`
}
