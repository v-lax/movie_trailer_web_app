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

        //splits the string of actors into and array, then passes that array to displayActors function
        console.log(response.Actors, "<===")
        var actorArr = response.Actors.split(", ")
        displayActors(actorArr)
    });

};
function getVideo() {

    var movieInput = $("#movie-input").val()
    $.ajax({
        method: 'GET',
        url: 'https://www.googleapis.com/youtube/v3/search',
        data: {
            key: 'AIzaSyAJ8GS9Q26oP02V831UEDAu8uaXvHsWIes',
            q: movieInput + ' Honest Trailer',
            part: 'snippet',
            maxResults: 1,
            type: 'video',
        }
    }).then(function (response) {
        console.log(response);
        console.log(response.data.items[1].videoId)
    })
};

////////////////////////Image of actors API//////////////////////////

console.log(response.items[0].id.videoId)
var videoId = response.items[0].id.videoId
var youtubeBase = "https://www.youtube.com/watch?v="
$("#honest-trailer-button").attr("href", youtubeBase + videoId)

$('#prev-search').on("click", ".movie", displayMovieInfo);

function displayActors(actornames) {
    console.log(actornames)
    for (let i = 0; i < actornames.length; i++) {
        var actorName = actornames[i]
        console.log(actorName)
        $.ajax({
            url: `https://www.googleapis.com/customsearch/v1?key=AIzaSyBMXuLospju_w3vYX_hODdqxcz3u_5x3j8&q=${actorName}&num=3&cx=0998025c5f77bfde1&searchTerm=image&alt=json`,
            method: "GET"
        }).then(function (response) {
            var actorImage = $("<img>")
            actorImage.attr("src", response.items[0].pagemap.imageobject[0].url)
            $("#actors").append(actorImage)
        })
    }

}