$(document).ready(function() {
// setting up the needed vars
var weatherCurrent = document.querySelector(".weatherCurrent");
var fiveDay = document.getElementById("fiveDay");
var searches = JSON.parse(localStorage.getItem("searches")) || [];
// current time vars
var today = new Date();
var date = (today.getMonth()+1)+'/'+today.getDate()+'/'+today.getFullYear();
// Showing the search history      
function renderHistory() {
        $("#history").empty();
        for (var i = 0; i < searches.length; i++) {
          $("#history").append($("<p class='city'>").text(searches[i]));
        }
      }

      $("form").on("submit", function (event) {
        event.preventDefault();
        var city = $("#city").val().trim();
        searches.push(city);
        localStorage.setItem("searches", JSON.stringify(searches));
        $("#city").val("");
        renderHistory();
        displayWeatherInfo(city);
      });

      $(document).on("click", ".city", function () {
        displayWeatherInfo($(this).text()); // displaying the weather info when a city is clicked
      });
      renderHistory();
// creating a function to display the weather info
function displayWeatherInfo(city){
  // setting up the query URL
   // need to make this input what the enter in the city search box
  var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=dadc20b0e9f1fa15e91b1c1cf640bb06" + "&units=imperial";
  // Creating the AJAX call 
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
console.log(response);
// displaying the name of the city
$(weatherCurrent).html("<h1>" + response.name + ": " + "("+ date + ")"+ "</h1>");

  });
}

    
});