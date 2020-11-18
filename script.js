//need to have an array for the search history
var movieSearch = [];


$("#search-but").on("click", function (event) {
    event.preventDefault();
    getVideo();
    var movSearch = $("#movie-input").val().trim();
    movieSearch.push(movSearch);
    localStorage.setItem("movieSearch", JSON.stringify(movieSearch));
    $("#movie-input").val("");
    renderButtons();
});


function renderButtons() {
    $("#prev-search").empty();
    var storedMovies = JSON.parse(localStorage.getItem("movieSearch"));

    if (storedMovies !== null) {
        movieSearch = storedMovies;
    }
    for (var i = 0; i < movieSearch.length; i++) {
        var a = $("<button>");
        a.addClass("movie");
        a.attr("data-movieName", storedMovies[i]);
        a.text(storedMovies[i]);
        $("#prev-search").append(a);

    }
    displayMovieInfo();
};

renderButtons();





// Movie api


function displayMovieInfo() {

    var movie = $(this).attr("data-movieName");

    if (movie === undefined) {
        movie = movieSearch[movieSearch.length - 1];
    }



    console.log(movie);
    var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";


    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        console.log(response);

        $("#movie-info").empty();
        $("#movie-poster").empty();

        var mainDiv = $("<div>");
        var rating = $("<div>");
        rating.text(response.Rated);
        mainDiv.append(rating);
        var released = $("<div>");
        released.text(response.Released);
        mainDiv.append(released);
        
        var plot = $("<div>");
        plot.text(response.Plot);
        mainDiv.append(plot);


        $("#movie-info").append(mainDiv);

        var movPost = $("<img>");
        movPost.attr("src", response.Poster);
        $("#movie-poster").append(movPost);


    });

};
function getVideo() {

    var movieInput = $("#movie-input").val()
    $.ajax({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      data: {
        key: 'AIzaSyAJ8GS9Q26oP02V831UEDAu8uaXvHsWIes',
        q: movieInput +' Honest Trailer',
        part: 'snippet',
        maxResults: 1,
        type: 'video',
      }}).then(function (response) {
        console.log(response);
        console.log(response.items[0].id.videoId)
        var videoId = response.items[0].id.videoId
        var youtubeBase = "https://www.youtube.com/watch?v="
        $("#honest-trailer-button").attr("href", youtubeBase + videoId)
        
      })};

      $('#prev-search').on("click", ".movie", displayMovieInfo);