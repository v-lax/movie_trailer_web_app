//need to have an array for the search history
var movieSearch = [];


$("#search-but").on("click", function (event) {
    event.preventDefault();
    var movSearch = $("#movie-input").val().trim();
    movieSearch.push(movSearch);
    localStorage.setItem("movieSearch", JSON.stringify(movieSearch));
    $("#movie-input").val("");
    displayMovieInfo(movSearch)
    renderButtons();
});


function renderButtons() {
    $("#prev-search").empty();
    var storedMovies = JSON.parse(localStorage.getItem("movieSearch"));

    if (storedMovies !== null) {
        movieSearch = storedMovies;
    }
    for (var i = 0; i < storedMovies.length; i++) {
        var a = $("<button>");
        a.addClass("movie");
        a.attr("data-movieName", storedMovies[i]);
        a.text(storedMovies[i]);
        $("#prev-search").append(a);
    }

};

renderButtons();





// Movie api


function displayMovieInfo(movie) {

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
        movPost.attr("id", "movieClick")
        $("#movie-poster").append(movPost);


    });

};

function hello(){
    //take user to honest trailer target=_blank
}



$(document).on("click", "#movieClick", hello);


$(document).on("click", ".movie", displayMovieInfo);