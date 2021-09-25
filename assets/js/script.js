var cityEl = document.getElementById("city-area");
var tempEl = document.getElementById("temp-area");
var windEl = document.getElementById("wind-area");
var searchEl = document.getElementById("search-button")
var deleteEl = document.getElementById("delete-button")
var searchHistoryEl = document.getElementById("search-history")
var humidityEl = document.getElementById("humidity-area");
var uvEl = document.getElementById("UV-area");
var cityInput = document.getElementById("city")
var inputs = JSON.parse(localStorage.getItem('input')) || []
// function I will use to get correct dates


var theWeather = function (city) {
  var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&id=524901&units=imperial&appid=9114ee0cf1e613881e91ee401ef02c78"
  fetch(apiUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      console.log(response);
      cityEl.innerHTML =
        "<h2>" +
        response.name +
        " (" +
        moment().format("YYYY/MM/DD") +
        ") </h2>";
      tempEl.innerHTML = "Temperature: " + response.main.temp + " &#176F";
      windEl.innerHTML = "Wind: " + response.wind.speed + " MPH";
      humidityEl.innerHTML = "Humidity: " + response.main.humidity + "%";
      var lat = response.coord.lat;
      var lon = response.coord.lon;
      fetch(
        "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" +
          lat +
          "&lon=" +
          lon +
          "&appid=9114ee0cf1e613881e91ee401ef02c78&cnt=1"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          uvEl.innerHTML = "UV Index: " + response[0].value;
        });
      var cityId = response.id;
      fetch(
        "https://api.openweathermap.org/data/2.5/forecast?id=" +
          cityId +
          "&units=imperial&appid=9114ee0cf1e613881e91ee401ef02c78"
      )
        .then(function (response) {
          return response.json();
        })
        .then(function (response) {
          console.log(response);
          var dayEl = document.querySelectorAll(".day");
          // code for date array found at https://stackoverflow.com/questions/61689917/javascript-for-loop-incrementing-momentjs-date-by-1-day
          var dates = [];
          for (i = 0; i < dayEl.length; i++) {
            var date = moment();
            dates.push({ date: date.add(i+1, "days").format("YYYY / MM / DD") });
            var dayIndex = i * 8 + 4;
            dayEl[i].innerHTML = "";
            console.log(dates)
            var dateEls = document.createElement("p");
            dateEls.innerHTML = dates[i].date;
            dayEl[i].append(dateEls);
            var dayTempEls = document.createElement("p");
            dayTempEls.innerHTML =
              "Temp: " + response.list[dayIndex].main.temp + " &#176F";
            dayEl[i].append(dayTempEls);
            var dayWindEls = document.createElement("p");
            dayWindEls.innerHTML =
              "Wind: " + response.list[dayIndex].wind.speed + " MPH";
            dayEl[i].append(dayWindEls);
            var dayHumidityEls = document.createElement("p");
            dayHumidityEls.innerHTML =
              "Humidity: " + response.list[dayIndex].main.humidity + "%";
            dayEl[i].append(dayHumidityEls);
            console.log(dateEls);
          }
        });
    });
};
searchEl.addEventListener("click", function() {
  var searchTerm = cityInput.value;
  theWeather(searchTerm);
  inputs.push(searchTerm);
  localStorage.setItem("input", JSON.stringify(inputs));
  Searchhistory()
  console.log(inputs)
})
// delete the search history
deleteEl.addEventListener("click", function() {
localStorage.clear();
inputs = [];
Searchhistory();
})

function Searchhistory() {
  searchHistoryEl.innerHTML = "";
  for (var i = 0; i < inputs.length; i++) {
    var inputItem = document.createElement("input");
    inputItem.setAttribute("type", "button")
    inputItem.setAttribute("readonly",true);
    inputItem.setAttribute("class", "test form-control d-block bg-white");
    inputItem.setAttribute("value", inputs[i]);
    inputItem.addEventListener("click", function () {
      theWeather(this.value)})
   
    searchHistoryEl.append(inputItem);
    
    }
}
Searchhistory()
var storedNames = JSON.parse(localStorage.getItem("input"));
console.log(localStorage);
console.log(inputs)

// some sections about search history are pulled from this github 
// https://github.com/sylviaprabudy/weather-dashboard/blob/master/assets/js/script.js
// was having a lot of trouble with it