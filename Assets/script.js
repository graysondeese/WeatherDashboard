$(document).ready(function () {
  $(".weatherCurrent").hide();
  // setting up the needed vars
  var cityCurrent = document.querySelector(".cityCurrent");
  var tempCurrent = document.querySelector(".tempCurrent");
  var humidityCurrent = document.querySelector(".humidityCurrent");
  var windSpeedCurrent = document.querySelector(".windSpeedCurrent");
  var uvCurrent = document.querySelector(".uvCurrent");
  // variables for the 5 day
  var date5 = document.querySelector(".date5");
  var temp5 = document.querySelector(".temp5");
  var humidity5 = document.querySelector(".humidity5");
  var windSpeed5 = document.querySelector(".windSpeed5");
  var uv5 = document.querySelector(".uv5");
  // var for searches
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
    $(".weatherCurrent").show();
    event.preventDefault();
    var city = $("#city").val().trim();
    searches.push(city);
    localStorage.setItem("searches", JSON.stringify(searches));
    $("#city").val("");
    renderHistory();
    displayWeatherInfo(city);
  });

  $(document).on("click", ".city", function () {
    $(".weatherCurrent").show();
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
      // setting the vars
      var day1Temp = (response.list[1].main.temp).toFixed(1);
      var day1Humidity = (response.list[1].main.humidity).toFixed(1);
      var day2Temp = (response.list[1].main.temp).toFixed(1);
      var day2Humidity = (response.list[1].main.humidity).toFixed(1);
      var day3Temp = (response.list[1].main.temp).toFixed(1);
      var day3Humidity = (response.list[1].main.humidity).toFixed(1);
      var day4Temp = (response.list[1].main.temp).toFixed(1);
      var day4Humidity = (response.list[1].main.humidity).toFixed(1);
      var day5Temp = (response.list[1].main.temp).toFixed(1);
      var day5Humidity = (response.list[1].main.humidity).toFixed(1);
      // displaying the 5 day statistics
      $(temp5).html(
        "<p>" + "Temperature: " + day1Temp + " °F" + "</p>"
      );
      $(humidity5).html(
        "<p>" + "Humidity: " + day1Humidity + "%" + "</p>"
      );
      
     })
  }
});
