$(document).ready(function () {
  // setting up the needed vars
  var cityCurrent = document.querySelector(".cityCurrent");
  var tempCurrent = document.querySelector(".tempCurrent");
  var humidityCurrent = document.querySelector(".humidityCurrent");
  var windSpeedCurrent = document.querySelector(".windSpeedCurrent");
  var uvCurrent = document.querySelector(".uvCurrent");
  // variables for the 5 day
  var searches = JSON.parse(localStorage.getItem("searches")) || [];
  // current date vars
  var today = new Date();
  var date =
    today.getMonth() + 1 + "/" + today.getDate() + "/" + today.getFullYear();
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
  function displayWeatherInfo(city) {
    // query url
    var queryURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=dadc20b0e9f1fa15e91b1c1cf640bb06" +
      "&units=imperial";
    // Creating the AJAX call
    $.ajax({
      url: queryURL,
      method: "GET",
    }).then(function (response) {
      // vars for lat and lon to get the index
      var lat = response.coord.lat;
      var long = response.coord.lon;
      var icon = $("<img>").attr(
        "src",
        " http://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
      );
      $(cityCurrent)
        .html("<h1>" + response.name + ": " + "(" + date + ")" + "</h1>")
        .append(icon);
      // $(cityCurrent).append(icon);
      // displaying all the current weather statistics
      $(tempCurrent).html(
        "<p>" + "Temperature: " + response.main.temp + " °F" + "</p>"
      );
      $(humidityCurrent).html(
        "<p>" + "Humidity: " + response.main.humidity + "%" + "</p>"
      );
      $(windSpeedCurrent).html(
        "<p>" + "Wind Speed: " + response.wind.speed + " MPH" + "</p>"
      );
      // ====== UV Index =====
    $.ajax({
      url:
        "http://api.openweathermap.org/data/2.5/uvi?appid=dadc20b0e9f1fa15e91b1c1cf640bb06&lat=" +
        lat +
        "&lon=" +
        long,
      method: "GET",
    }).then(function (response) {
      // displaying the current uv index
      $(uvCurrent).html("<p>" + "UV Index: " + response.value + "</p>");
    });
    });

  
    // ====== 5 day forecast =======
     $.ajax({
      url: "https://api.openweathermap.org/data/2.5/forecast?q=" +city + "&appid=dadc20b0e9f1fa15e91b1c1cf640bb06" + "&units=imperial",
      method: "GET"
     }).then(function(response) {
      console.log(response);
     })
  }
});
