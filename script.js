//need to have an array for the search history
var movieSearch = [];


$("#search-but").on("click", function (event) {
    event.preventDefault();
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
        // $("#movie-info").empty();

        // var mainDiv = $("<div>");
        // var rating = $("<li>");
        // rating.text("Rated: " + response.Rated);
        $("#movie-rating").text(("Rated: " + response.Rated));

        
        // var released = $("<div>");
        // released.text("Release Date: " + response.Released);
        // mainDiv.append(released);
        $("#release-date").text(("Released: " + response.Released));
        $("#movie-genre").text(("Genre: " + response.Genre));
        $("#movie-plot").text((response.Plot));
        
        // var plot = $("<div>");
        // plot.text(response.Plot);
        // mainDiv.append(plot);


        // $("#movie-info").append(mainDiv);

        var movPost = $("<img>");
        movPost.attr("src", response.Poster);
        $("#movie-poster").append(movPost);


    });

};





$(document).on("click", ".movie", displayMovieInfo);