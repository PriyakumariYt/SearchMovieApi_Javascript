const Api =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=fcf583738f97e4dffba1632ca404d4a7&page=2";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=fcf583738f97e4dffba1632ca404d4a7&query=";

async function urlFetch(url) {
  try {
    let response = await fetch(url);
    let data = await response.json();
    showMovies(data.results);
    // console.log(data);
  } catch (error) {
    console.log(error);
  }
}

document.addEventListener("DOMContentLoaded", function () {
  urlFetch(Api);
});

const showMovies = (data) => {
  const movieBox = document.querySelector("#container");
  movieBox.innerHTML = "";

  data.map((elem) => {
    let box = document.createElement("div");
    box.setAttribute("class", "Movies");
    let image = document.createElement("img");
    image.setAttribute(
      "src",
      `https://image.tmdb.org/t/p/w500/${elem.poster_path}`
    );
    //         let image = document.createElement("img");
    // image.setAttribute("src", elem.poster_path);

    let title = document.createElement("h2");
    title.innerText = elem.original_title;
    let rating = document.createElement("h3");
    rating.innerText = elem.vote_average;

    box.append(image, title, rating);
    movieBox.appendChild(box);
  });
};

document.querySelector("#search").addEventListener("keyup", function (event) {
  if (event.target.value != "") {
    urlFetch(SEARCHAPI + event.target.value);
  } else {
    urlFetch(Api);
  }
});
