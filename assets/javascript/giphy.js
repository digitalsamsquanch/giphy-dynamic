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
            "api-key": "DXegwsyntvZb8CarqFL5e6af0Rs6fIMo",
            "q":    this.text,
        }
        
        var queryURL = "https://api.giphy.com/v1/gifs/search";
        
        $.ajax({
            url: queryURL,
            method: "GET",
            data: params
          }).then(function(response) {
            // Storing an array of results in the results variable
            var results = response.data;
  
            // // Looping over every result item
            // for (var i = 0; i < results.length; i++) {
  
            //   // Only taking action if the photo has an appropriate rating
            //   if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
            //     // Creating a div for the gif
            //     var gifDiv = $("<div>");
  
            //     // Storing the result item's rating
            //     var rating = results[i].rating;
  
            //     // Creating a paragraph tag with the result item's rating
            //     var p = $("<p>").text("Rating: " + rating);
  
            //     // Creating an image tag
            //     var personImage = $("<img>");
  
            //     // Giving the image tag an src attribute of a proprty pulled off the
            //     // result item
            //     personImage.attr("src", results[i].images.fixed_height.url);
  
            //     // Appending the paragraph and personImage we created to the "gifDiv" div we created
            //     gifDiv.append(p);
            //     gifDiv.append(personImage);
  
            //     // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
            //     $("#gifs-appear-here").prepend(gifDiv);
            //   }
            // }
        });
    })
});
makeButtons();