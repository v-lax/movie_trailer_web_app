//need to have an array for the search history
var movieSearch = [];


$("#search-but").on("click", function(event){
    event.preventDefault();
    var movSearch =$("#movie-input").val().trim();
    movieSearch.push(movSearch);
    localStorage.setItem("movieSearch", JSON.stringify(movieSearch));
    $("#movie-input").val("");
    renderButtons();
});


function renderButtons(){
    $("#prev-search").empty();
    var storedMovies = JSON.parse(localStorage.getItem("movieSearch"));

    if (storedMovies !== null){
        movieSearch=storedMovies;
    }
    for (var i=0;i<storedMovies.length;i++){
        var a =$("<button>");
        a.addClass("movie");
        a.attr("data-movieName", storedMovies[i]);
        a.text(storedMovies[i]);
        $("#prev-search").append(a);
    }

};

renderButtons();