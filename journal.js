const favMovie = JSON.parse(localStorage.getItem('favList'))
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const popMoviesFav = document.getElementById("popularMovieList")
        favMovie.forEach(movie => {
            const item = document.createElement("li");
            item.innerHTML = `
            <a href="#"><img src="${movie.imgSrc}" alt="movie poste" class="w-full rounded-[3rem] shadow-lg"/></a>
            <div class="mt-[7px] pl-[2rem]">
            <h4 class="text-[1.4rem] md:text-[1.6rem]">${movie.title}</h4>
            <span>${movie.votes}</span>
            <span>${movie.releaseDate}</span>
            </div>
            <button class="w-[80%] mt-[1rem] py-[5px] px-[2rem] text-[1.4rem] bg-[#020F1D] rounded-full">+ Delete from Favorites</button>
            `
            item.classList.add("flex", "flex-col", "justify-between");
            popMoviesFav.appendChild(item);
        })
    } catch (error) {
        console.error(error);
    }
});


// const movie2 = JSON.parse(localStorage.getItem('movie'))
// console.log(movie2)
// document.addEventListener("DOMContentLoaded", async () => {
// try {
//     const popularMovies = await movie2;
//     const popMoviesView = document.getElementById("popularMovieList");
//     popularMovies.forEach(movie => {
//         console.log("movie.poster_path", movie.poster_path);
//         console.log(movie);

//         const item = document.createElement("li");

//         item.innerHTML = `
//         <a href="#"><img src="${movie.poster_path}" alt="movie poste" class="w-full rounded-[3rem] shadow-lg"/></a>
//         <div class="mt-[7px] pl-[2rem]">
//         <h4 class="text-[1.4rem] md:text-[1.6rem]">${movie.title}</h4>

//         <span>⭐️ ${movie.vote_average.toFixed(1)}</span>
//         <span>| ${movie.release_date.split("-")[0]}</span>
//         </div>
//         `;
//         item.classList.add("flex", "flex-col", "justify-between");
//         popMoviesView.appendChild(item);
//     });
// } catch (error) {
//     console.error(error);
// }
// });