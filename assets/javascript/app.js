var starWars = ["Luke Skywalker", "Darth Vader", "Darth Sidious", "Leia Organa"];

// Function for displaying gifs
function renderButtons() {

    // Deleting the buttons prior to adding new button to avoid repeats

    $("#buttons-view").empty();

    // Looping through the array of terms
    for (var i = 0; i < starWars.length; i++) {

        // Then dynamicaly generating buttons for each term in the array
        // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
        var a = $("<button>");
        // Adding a class of starWars to our button
        a.addClass("starWars");
        // Creates the person data attribute
        a.attr("data-person", starWars[i]);
        // Creates the text
        a.text(starWars[i]);
        // Adding the button to the div
        $("#buttons-view").append(a);
    }
}

// Function after clicking the add gif button
$("#add-gif").on("click", function(event) {
    event.preventDefault();
    // Gets user input
    var newGif = $("#gif-input").val().trim();

    // Pushing search to the array
    starWars.push(newGif);
    renderButtons();
});

// Calling the renderButtons function
renderButtons();

$("#buttons-view").on("click", "button",function() {
    var person = $(this).attr("data-person");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        person + "&api_key=HWyUooDQBFPrVuN2qZBC8RliKd8WdGok&limit=10";

    $.ajax({
            url: queryURL,
            method: "GET"
        })
        .done(function(response) {
            var results = response.data;

            for (var i = 0; i < results.length; i++) {
                var gifDiv = $("<div class='item'>");

                var rating = results[i].rating;

                var p = $("<p class='rating'>").text("Rating: " + rating);

                var personImage = $("<img>");
                personImage.attr("src", results[i].images.fixed_height_still.url);
                personImage.attr("data-animate", results[i].images.fixed_height.url);
                personImage.attr("data-still", results[i].images.fixed_height_still.url);
                personImage.attr("data-state", "still");
                personImage.addClass("gif");

                gifDiv.prepend(p);
                gifDiv.prepend(personImage);

                $("#gif-area").prepend(gifDiv);

                $(".gif").on("click", function() {
                    var state = $(this).attr("data-state");
                    if (state === "still") {

                        $(this).attr("src", $(this).attr("data-animate"));
                        $(this).attr("data-state", "animate");
                    } else {
                        $(this).attr("src", $(this).attr("data-still"))
                        $(this).attr("data-state", "still");

                    }
                });
            }
        });
});