var topics = ["joe dirt", "talladega nights", "wedding crashers", "dumb and dumber", "ace ventura"];

function makeButtons() {
    $("#buttons").empty();
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
                console.log(results[i])
  
                var rating = results[i].rating;
                var p = $("<p>").text("Rating: " + rating);
  
                var personImage = $("<img>");
  
                personImage.attr("src", results[i].images.fixed_height_still.url);
  
                gifDiv.append(p);
                gifDiv.append(personImage);
  
                $("#gifBucket").prepend(gifDiv);
            };
        });
    });
});
makeButtons();