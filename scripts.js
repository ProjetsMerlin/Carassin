/* Unités possibles */
const unites = {
  "humidity" : "% d'humidité",
  "temp" : "°",
  "temp_min" : "° Min.",
  "feels_like" : "° Ressenti",
  "temp_max" : "° Max.",
  "wind_speed" : " km/h",
  "description" : "",
  "wind_deg" : "",
  "sunset" : "",
  "sunrise" : "",
}

/* Formate une date timestamp en heure & minutes */
function timeToHour(timestamp) {
  const date = new Date(timestamp * 1000)
  const hours = date.getUTCHours() + 1
  const minutes = date.getUTCMinutes()
  return hours + ':' + minutes
}

/* Convertit les degrés Pascal en Celcius */
function pascalToCelcius(kelvin) {
  return (kelvin - 273.15).toFixed(1)
}

/* Convertit les m/s en km/h */
function msToKmh(mps) {
  return (mps * 3.6).toFixed(0)
}

/* Ajouter l'élement HTML en dessous du parent et avec son unité */
function createElement(element, data, parent, unite) {
  var element = document.createElement(element)
  element.textContent = data + unites[unite]
  var container = document.querySelector(parent)
  return container.appendChild(element)
}

/* Convertit la direction du vente en point cardinaux */
function degreeToCardinal(deg) {
  var degrees = parseFloat(deg)
  const cardinalDirections = [
    "Nord",
    "Nord Nord Est",
    "Nord Est",
    "Est Nord Est",
    "Est",
    "Est Sud Est",
    "Sud Est",
    "Sud Sud Est",
    "Sud",
    "Sud Sud Ouest",
    "Sud Ouest",
    "Ouest Sud Ouest",
    "Ouest",
    "Ouest Nord Ouest",
    "Nord Ouest",
    "Nord Nord Ouest"
  ]
  const degreesPerDirection = 360 / cardinalDirections.length
  const index = Math.floor((degrees % 360) / degreesPerDirection)
  return cardinalDirections[index]
}

server = 'server-sample.php'
if ( window.location.hostname === 'localhost' ) { //lintermediaire.be
  var server = 'server.php'
}

async function runAPI(server) {
  fetch(server)
  .then(response => response.json())
  .then(data => {
    [data].forEach(function(item) {
      createElement('span', item.weather[0].description, "#description", "description")
      createElement('span', pascalToCelcius ( item.main.feels_like ), "#feels_like", "feels_like")
      createElement('span', pascalToCelcius ( item.main.temp ), "#temp", "temp")
      createElement('span', pascalToCelcius ( item.main.temp_max ), "#temp_max", "temp_max")
      createElement('span', pascalToCelcius ( item.main.temp_min ), "#temp_min", "temp_min")
      createElement('span', msToKmh ( item.wind.speed ), "#wind_speed", "wind_speed")
      createElement('span', degreeToCardinal ( item.wind.deg ), "#wind_deg", "wind_deg")
      createElement('span', item.main.humidity, "#humidity", "humidity")
      createElement('span', timeToHour ( item.sys.sunrise ), "#sunrise", "sunrise")
      createElement('span', timeToHour ( item.sys.sunset ), "#sunset", "sunset")
      var icon = "https://openweathermap.org/img/wn/"+ item.weather[0].icon +"@2x.png"
      var image = document.querySelector("#icon")
      image.src = icon
    })
  })
  .catch(error => { //console.log(error)
    createElement('span', "Aie !", "#description", "description")
    const elements = document.querySelectorAll('.wrap');
    elements.forEach(element => {
      element.remove()
    })
  })
}
runAPI(server)