//need to have an array for the search history
var movieSearch = [];


$("#search-but").on("click", function (event) {
    event.preventDefault();
    var movSearch = $("#movie-input").val().trim();
    console.log(typeof movSearch)
    if((movSearch!=='') && (movieSearch.indexOf(movSearch)===-1)){
        movieSearch.push(movSearch);
        localStorage.setItem("movieSearch", JSON.stringify(movieSearch));
        $("#movie-input").val("");
        renderButtons();
        getVideo(movieSearch)
    } 
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
    console.log(movieSearch)
    displayMovieInfo(movieSearch[movieSearch.length-1]);
    if(!movieSearch.length) {
        return;
    };
    getVideo(movieSearch[movieSearch.length-1])
};

renderButtons();


// Movie api


function displayMovieInfo(movie) {
    if(movie!==undefined){
        //$('#warning').hide()
        //$('#general-info').show()
        //$('#movie-poster').show()
        var queryURL = "https://www.omdbapi.com/?t=" + movie + "&apikey=trilogy";


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (response) {
            
            $('#general-info').show()
            $('#movie-poster-info').show()
            $('#warning').hide()

            $("#movie-info").empty();
            $("#movie-poster").empty();
    
            $("#movie-rating").text(("Rated: " + response.Rated));
    
    
            $("#release-date").text(("Released: " + response.Released));
            $("#movie-genre").text(("Genre: " + response.Genre));
            $("#movie-plot").text((response.Plot));
    
    
            var movPost = $("<img>");
            movPost.attr("src", response.Poster);
            $("#movie-poster").append(movPost);
            displayActors(response.Actors)
            
        });
    }else{
        var alert = $('<div>')
        alert.addClass('notification is-danger has-text-centered')
        alert.attr('id','warning')
        alert_button = $('<button>')
        alert_button.addClass('delete')
        alert.text('Type a movie into that search to get information about a movie and a link to its honest trailer!')
        alert.append(alert_button)
        $('#movie-information').append(alert)

        $('#general-info').hide()
        $('#movie-poster-info').hide()
    }
};
function getVideo(movieInput) {

    
    $.ajax({
      method: 'GET',
      url: 'https://www.googleapis.com/youtube/v3/search',
      statusCode:{
          403:function(){
              $("#trailer-button").text("Sorry we've hit our limit!")
          }
      },
      data: {
        key: 'AIzaSyCjerp3IakGbMamBLXHAI_lfuATAEnvVI8',
        q: movieInput +' Honest Trailer',
        part: 'snippet',
        maxResults: 1,
        type: 'video',
      }}).then(function (response) {
        console.log(response)
        var videoId = response.items[0].id.videoId;
        var youtubeBase = "https://www.youtube.com/watch?v=";
        $("#honest-trailer-button").attr("href", youtubeBase + videoId);
        
      }
      
      )};
$('#clear-but').on("click", function(){
  localStorage.clear();
  $("#prev-search").empty();
  movieSearch=[];
   
})


$('#prev-search').on("click", ".movie", function(){
          var prevName = $(this).attr("data-movieName")
          displayMovieInfo(prevName);
          getVideo(prevName)
      })

$('.delete').on('click',function(){
    $('#warning').hide()
})
      
        

////////////////////////Image of actors API//////////////////////////
function displayActors(actornames) {
    actorArray = actornames.split(',')
    $('#actors').empty()
    for (let i = 0; i < actorArray.length; i++) {
        var actorName = actorArray[i]
        var url = `https://www.googleapis.com/customsearch/v1?key=AIzaSyC7Nah9soBx-1hh4JCvbnMx81_d1wR4UQo&q=${actorName}&num=3&cx=0998025c5f77bfde1&searchTerm=image&alt=json`
    
        $.ajax({
            url: url,
            method: "GET",
            statusCode:{
                429:function(){
                    $("h5").remove()

                    var span = $('<span>')
                    span.addClass('icon is-large mt-1 has-text-white mr-2 ml-2')
                    var icon = $('<i>')
                    icon.addClass('far fa-smile-wink fa-2x fa-pulse')
                    span.append(icon)
                    $('#actors').append(span)

                    var errorMsg = $("<h5>")
                    errorMsg.addClass('has-text-white mt-3')
                    errorMsg.text("GOOGLE API has run out of requests, so here are some spining faces instead")
                    $("#general-info").append(errorMsg)
                }
            }
            
        }).then(function (response) {
            console.log(response)
            var actorFigure = $('<figure>')
            var actorImage = $("<img>")
            if(response.items[0].pagemap.imageobject[0].url===undefined){
                actorImage.attr('src','https://bulma.io/images/placeholders/128x128.png')
            }else{
                actorImage.attr("src", response.items[0].pagemap.imageobject[0].url)
            }
            actorImage.attr("src", response.items[0].pagemap.imageobject[0].url)
            actorImage.addClass('is-rounded')
            actorFigure.append(actorImage)
            actorFigure.addClass('image is-128x128')
            $("#actors").append(actorFigure)
        })
    }

}
