var topics = ["joe dirt", "talladega nights", "wedding crashers", "dumb and dumber", "ace ventura"];

function makeButtons() {
    $(".buttonStore").empty();
    for (var i = 0; i < topics.length; i++) {

        var a = $("<button type='button'>");
        a.addClass("btn btn-dark topic");
        a.attr("data-name", topics[i]);
        a.text(topics[i]).css("text-transform", "capitalize");
        $(".buttonStore").append(a);
        
    };
};
$(document).ready(function() {
    $("body").on("click", ".topic", function() {
        var params = {
            "apikey": "DXegwsyntvZb8CarqFL5e6af0Rs6fIMo",
            "q":    $(this).attr("data-name"),
            "limit": 10
        }
        
        var queryURL = "https://api.giphy.com/v1/gifs/search";
        
        $.ajax({
            url: queryURL,
            method: "GET",
            data: params
          }).then(function(response) {
            var results = response.data;
            console.log(results.length)
            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div>");
                $(gifDiv).addClass("gifDiv")
                console.log(results[i])
  
                var rating = results[i].rating;
                var p = $("<div>").text("Rating: " + rating);
  
                var personImage = $("<img>");
  
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-moving", results[i].images.fixed_height.url);
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-state", "still");
                personImage.addClass("gif");
  
                gifDiv.append(p);
                gifDiv.append(personImage);
  
                $("#gifBucket").prepend(gifDiv);
            };
        });
        var params2 = {
            "apikey": "5127583f",
            "t": ($(this).attr("data-name") || '').split(' ').join('+')
        }
        queryURL2 = "https://www.omdbapi.com/?";
        $.ajax({
            url: queryURL2,
            method: "GET",
            data: params2
          }).then(function(response) {
            console.log(params2)
            $("#movieInfo").empty();
            $("#movieInfo").append("<img id='moviePoster'>");
            $("#moviePoster").attr("src", response.Poster);
            $("#movieInfo").append("<p><span id='releaseDate'>Release Year: </span>" + response.Year + "</p>")
            $("#releaseDate").css("font-size", "1.25rem")
            $("#movieInfo").append("<h3 id='ratingsHeader'>Ratings</h3>")
            $("#movieInfo").append("<p>", "<span class='scoreTitle'>IMDB:</span> " + response.Ratings[0].Value);
            $("#movieInfo").append("<p>", "<span class='scoreTitle'>Rotten Tomatoes:</span> " + response.Ratings[1].Value)
            $("#movieInfo").append("<p>", "<span class='scoreTitle'>Metacritic:</span> " + response.Ratings[2].Value)
            $(".scoreTitle").css("font-weight", "bold")
          });
    });
    $("body").on("click", ".gif", function() {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-moving"));
            $(this).attr("data-state", "moving");
        } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
        };
    });
    $("#addGif-button").click(function(){ 
        event.preventDefault();
        var gifTopic = $("#gifTopic").val().trim();
        topics.push(gifTopic);
        $("#gifTopic").val('');
        makeButtons();
    })
});
makeButtons();