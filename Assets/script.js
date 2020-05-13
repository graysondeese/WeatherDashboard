$(document).ready(function() {
// setting up the needed vars
var weatherCurrent = document.querySelector(".weatherCurrent");
var fiveDay = document.getElementById("fiveDay");
var searches = JSON.parse(localStorage.getItem("searches")) || [];
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
      });
      $(document).on("click", ".city", function () {
        console.log($(this).text()); // add the function to display the weather info here
      });
      renderHistory();
    });