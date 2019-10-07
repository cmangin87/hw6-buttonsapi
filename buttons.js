$(document).ready(function () {

    var wrestlers = ["hulk hogan", "ric flair", "macho man randy savage", "stone cold steve austin",
    "the rock", "the undertaker", "vince mcmahon", "andre the giant", "shawn michaels",
    "bret hart", "cm punk", "randy orton", "john cena", "rey mysterio", "triple h",
    "brock lesnar", "roman reigns", "kane", "chris jericho", "daniel bryan", "kurt angle",
    "the ultimate warrior", "eddie guerrero", "mick foley", "rowdy roddy piper", "dusty rhodes",
    "hacksaw jim duggan", "bill goldberg", "kevin nash", "scott hall", "ted dibiase", "batista",
    "jake the snake roberts"];

    $("#buttons-view").on("click", ".gif-button", gifInfo);
    $("#wrestler-view").on("click", ".gif", playPause);

    function gifInfo() {
        var wrestler = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=I66f2K21GtxWWbNs2Qr1pZHYsqAw2UIb&q=" + 
                            wrestler + "&limit=10&offset=0&rating=G&lang=en";

        $.ajax({
            url: queryURL,
            method: "GET"
        })
        .then(function (response) {
            console.log (queryURL);
            console.log (response);

            var results = response.data;

        for (var i = 0; i < results.length; i++) {

            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;

            var gifImage = $("<img>");
            var rating = $("<p>");
            var gifDiv = $("<div>");

            gifImage.attr("src", still);
            gifImage.attr("data-still", still);
            gifImage.attr("data-animate", animated);
            gifImage.attr("data-state", "still");
            gifImage.attr("class", "gif");

            rating.attr("class", "rating");
            rating.text("Rating: " + results[i].rating);

            gifDiv.prepend(rating);
            gifDiv.append(gifImage);

            $("#wrestler-view").prepend(gifDiv);
        };
    });  
};

    function renderButtons() {
        $("#buttons-view").empty();

    for (var i = 0; i < wrestlers.length; i++) {
        var button = $("<button>");
        button.addClass("gif-button");
        button.attr("data-name", wrestlers[i]);
        button.text(wrestlers[i]);
        $("#buttons-view").append(button);
    }
}

    $("#wrestler-gif").on("click", function (event) {
        event.preventDefault();
        var gifSearch = $("#wrestler-input").val().trim();
        wrestlers.push(gifSearch);
        renderButtons();
        $("#wrestler-input").val("");
});

    function playPause(){
        var state = $(this).attr("data-state");

        if (state === "still"){
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        }
            else {
                $(this).attr("src", $(this).attr("data-still"));
                $(this).attr("data-state", "still");
                }
};

renderButtons();

});