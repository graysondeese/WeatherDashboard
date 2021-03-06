$(document).ready(function () {
  $(".fiveDayBox").hide();
  $(".weatherCurrent").hide();
  // setting up the needed vars
  var cityCurrent = document.querySelector(".cityCurrent");
  var tempCurrent = document.querySelector(".tempCurrent");
  var humidityCurrent = document.querySelector(".humidityCurrent");
  var windSpeedCurrent = document.querySelector(".windSpeedCurrent");
  var uvCurrent = document.querySelector(".uvCurrent");
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
    $(".fiveDayBox").show();
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
    $(".fiveDayBox").show();
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
        " https://openweathermap.org/img/wn/" + response.weather[0].icon + ".png"
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
        "https://api.openweathermap.org/data/2.5/uvi?appid=dadc20b0e9f1fa15e91b1c1cf640bb06&lat=" +
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
      // setting the vars for all the days
      var day1Temp = (response.list[1].main.temp).toFixed(1);
      var day1Humidity = (response.list[1].main.humidity).toFixed(1);
      var day2Temp = (response.list[9].main.temp).toFixed(1);
      var day2Humidity = (response.list[9].main.humidity).toFixed(1);
      var day3Temp = (response.list[17].main.temp).toFixed(1);
      var day3Humidity = (response.list[17].main.humidity).toFixed(1);
      var day4Temp = (response.list[25].main.temp).toFixed(1);
      var day4Humidity = (response.list[25].main.humidity).toFixed(1);
      var day5Temp = (response.list[33].main.temp).toFixed(1);
      var day5Humidity = (response.list[33].main.humidity).toFixed(1);
      // displaying the 5 day statistics
      $(".fiveDay").text("Five-Day Forecast:");
      // day 1
      $("#day1Date").text(response.list[1].dt_txt.split(' ')[0]);
      $(".temp5One").html(
        "<p>" + "Temperature: " + day1Temp + " °F" + "</p>"
      );
      $(".humidity5One").html(
        "<p>" + "Humidity: " + day1Humidity + "%" + "</p>"
      );
      //day 2
      $("#day2Date").text(response.list[9].dt_txt.split(' ')[0]);
      $(".temp5Two").html(
        "<p>" + "Temperature: " + day2Temp + " °F" + "</p>"
      );
      $(".humidity5Two").html(
        "<p>" + "Humidity: " + day2Humidity + "%" + "</p>"
      );
      //day 3
      $("#day3Date").text(response.list[17].dt_txt.split(' ')[0]);
      $(".temp5Three").html(
        "<p>" + "Temperature: " + day3Temp + " °F" + "</p>"
      );
      $(".humidity5Three").html(
        "<p>" + "Humidity: " + day3Humidity + "%" + "</p>"
      );
      //day 4
      $("#day4Date").text(response.list[25].dt_txt.split(' ')[0]);
      $(".temp5Four").html(
        "<p>" + "Temperature: " + day4Temp + " °F" + "</p>"
      );
      $(".humidity5Four").html(
        "<p>" + "Humidity: " + day4Humidity + "%" + "</p>"
      );
      //day 5
      $("#day5Date").text(response.list[33].dt_txt.split(' ')[0]);
      $(".temp5Five").html(
        "<p>" + "Temperature: " + day5Temp + " °F" + "</p>"
      );
      $(".humidity5Five").html(
        "<p>" + "Humidity: " + day5Humidity + "%" + "</p>"
      );
     })
  }
});
