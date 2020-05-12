$(document).ready(function() {
var searches = JSON.parse(localStorage.getItem("searches")) || [];
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
        console.log($(this).text());
      });
      renderHistory();
    });