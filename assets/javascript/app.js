//make an array of topics related to the theme of Disney movies
var topics =  ["Lion King", "Toy Story", "Mulan", "Tangled", "Frozen", "Snow White and the Seven Dwarfs", "Pinocchio", "Fantasia", "Dumbo", "Bambi", "Cinderella", "Alice in Wonderland", "Peter Pan", "Lady and the Tramp", "Sleeping Beauty", "The Sword in the Stone", "101 Dalmatians", "The Jungle Book", "The Aristocats", "Robin Hood", "The Fox and the Hound", "The Rescuers", "The Little Mermaid", "Beauty and the Beast", "Aladdin", "Pocahontas", "Hercules", "The Hunchback of Notre Dame", "Tarzan", "The Emperor's New Groove", "Lilo & Stitch", "The Princess and the Frog", "Bolt", "Big Hero 6", "Moana", "Zootopia"];

//make a button for each of the items in the array by creating a loop
for(var i = 0; i<topics.length; i++) {
    var newButton = $("<button>");
    var newDiv = $("<div>");
    newDiv.attr("class", "button-holder");

    //add a class to each button
    newButton.addClass("btn btn-dark button");
    
    //add an attribute to hold the movie name
    newButton.attr("data", topics[i]);

    //display the movie name on the button
    newButton.text(topics[i]);

    //add each button to the "buttons" div from the html page
    newDiv.append(newButton);
    $("#buttons").append(newDiv);
}

//function that will display the GIF's when the user clicks a button
function displayGif() {


    //clear any previous searches from the html
    $("#gifResults").empty();

    var topic = $(this).attr("data");
    var apikey = "FScwHnt4IaRH4h5IhwiB5fa3P9ZVAulG";
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=" + apikey + "&limit=10&q=" + topic;
    
    // Create AJAX call for the specific topic button the user clicks
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
      console.log(response)

      
      //create a for loop to get the 10 results from the array response
    for(var y = 0; y<response.data.length; y++) {
        

      //create a div to hold the current button clicked 10 search results
      var newGifDiv = $("<div>").attr('class', 'images'); 
      //get the first Gif from the group of 10
      var newGifImageUrl = response.data[y].images.fixed_height.url;
      //create an image to put in the html
      var image = $("<img>").attr("src", newGifImageUrl);
      image.attr("class", "imageHolder");
      image.attr("data", response.data[y].id);
      image.attr("data-state", "still");
      if(image.height > newGifDiv.height) {
        image.height = "200px";
    } else {image.height = "auto"}
      if(image.width > newGifDiv.width) {
        image.width = newGifDiv.width - "20px";
      } else {image.width = "auto"}

      //get the rating of the gif
      var rating = $("<h5 class='rating'>Rating:  " + response.data[y].rating + "</h5>");
      //add the image to the div
      newGifDiv.append(image);
      //add the rating to the div
      newGifDiv.prepend(rating);
      //add the new div to the html
      $("#gifResults").append(newGifDiv);
    }
    
    }
)}

    function playGif(){
           
        var idOfGif = $(this).attr("data");
        console.log(idOfGif);
        var apikey = "Ia5ivBDTcT9ZEst5cmMVGTuqpcLcvTiE";
        var queryURL = "https://api.giphy.com/v1/gifs/" + idOfGif + "?api_key=" + apikey;
        console.log(queryURL);
        
        // Create AJAX call for the specific Gif picture the user clicks
        $.ajax({
          url: queryURL,
          method: "GET"
        }).then(function(response) {

    //get the animated version of the gif
      var newAnimatedGif = response.data.images.fixed_height.url;
      console.log(newAnimatedGif);
      //replace the still version with the animated version
      var imageHolder = $(".imageHolder").attr("data", idOfGif);
      imageHolder.attr("src", newAnimatedGif);

      
    
})}

    function stopGif(){


}



//on click event that calls the displayGif function
$(document).on("click", ".button", displayGif);
//on click event that calls the playGif function
$(document).on("click", ".imageHolder", playGif);
//on click event that calls the StopGif function
$(document).on("click", ".button", stopGif);
