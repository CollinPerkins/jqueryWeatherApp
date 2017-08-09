var isCel = true;
var tempValue;

$(document).ready(function() {
  getWeather();

  $(".weatherTemp").click(function() {
    if(isCel) {
      isCel = !isCel;
      tempValue = convertToFahrenheit(tempValue);
      $(".weatherTemp").html(tempValue + "F");
    } else {
      isCel = !isCel;
      tempValue = convertToCelsius(tempValue);
      $(".weatherTemp").html(tempValue + "C");
    }
  })
});

// API Function to get and set html feilds
function getWeather() {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      $.get("https://fcc-weather-api.glitch.me/api/current?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude, function(data, status){
        $(".weatherCity").html(data.name + ", " + data.sys.country);
        tempValue = data.main.temp;
        console.log(data);
        $(".weatherTemp").html(Math.round(data.main.temp) + "C");
        $(".weatherCurrent").html(data.weather[0].main);
        $(".weatherIcon").html('<img src="' + data.weather[0].icon + '" />')
      });
    });
  } else {
    $(".weatherCity").html('This app is not supported for this browser!');
  }
}

function convertToFahrenheit(tempValue) {
  return Math.round(tempValue * 1.8 + 32);
}

function convertToCelsius(tempValue) {
  return Math.round((tempValue - 32) * .5556);
}
