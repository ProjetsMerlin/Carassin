# Carassin

## Le projet
Carassin est une application météo qui utilise l'API "OpenWeatherMap". Ici, l'objectif était surtout de cacher la clé API utilisée.
Je le fais via un cryptage et décryptage RSA (+ de détail dans le fichier generate.html)
Si la clé publique et privée permettent de décrypter la clé API, alors la requête fonctionne et affiche la météo du jour.

## Javascript
Remarques : à travers ce projet, quelques fonctions JS intéressantes sont créés pour formater certaines données.
Voilà les exemples : 

```JAVSCRIPT

function timeToHour(timestamp) {
  const date = new Date(timestamp * 1000)
  const hours = date.getUTCHours() + 1
  const minutes = date.getUTCMinutes()
  return hours + ':' + minutes
}

function pascalToCelcius(kelvin) {
  return (kelvin - 273.15).toFixed(1)
}

function msToKmh(mps) {
  return (mps * 3.6).toFixed(2)
}


```

## Style
Le framework css utilisé dans le but de styliser quelque peu le rendu, est Tailwind.css

## Le logo
Le logo a été créé à l'aide d'un générateur de logo (voir lien ci-dessous). Le logo est un poisson. Car "Carassin" est le nom d'un poisson. 🐟 👍

### Liens utiles :
- Documentation de l'API "OpenWeatherMape" : https://openweathermap.org/api
- Tailwind css : https://tailwindcss.com
- Générateur de logo : https://www.design.com