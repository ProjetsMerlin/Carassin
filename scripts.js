const article = document.querySelector('.js_weather')

const unites = {
  "description" : "",
  "humidity" : "% d'humidité",
  "temp" : "°",
  "temp_min" : "° Min.",
  "feels_like" : "° Ressenti",
  "temp_max" : "° Max.",
  "wind_speed" : " km/h",
  "wind_deg" : "",
  "sunset" : "",
  "sunrise" : "",
}

/* Formate une date en timestamp en heure & minutes */
function timeToHour(timestamp) {
  const date = new Date(timestamp * 1000)
  const hours = date.getUTCHours() + 1
  const minutes = date.getUTCMinutes()
  return hours + ':' + minutes
}

/* Convertit les degré Pascal en degré Celcius */
function pascalToCelcius(kelvin) {
  return (kelvin - 273.15).toFixed(1)
}

/* Convertit les m/s en km/h */
function msToKmh(mps) {
  return (mps * 3.6).toFixed(0)
}

function createElement(element, data, parent, unite) {
  var element = document.createElement(element)
  element.textContent = data + unites[unite]
  var container = document.querySelector(parent)
  return container.appendChild(element)
}

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

async function decryptRSA(encryptedData, privateKey) {
  const encryptedArray = new Uint8Array(encryptedData.match(/.{1,2}/g).map(byte => parseInt(byte, 16)))
  const cryptoKey = await window.crypto.subtle.importKey(
    'jwk',
    privateKey,
    { name: 'RSA-OAEP', hash: 'SHA-256' },
    false,
    ['decrypt']
  )
  const decryptedData = await window.crypto.subtle.decrypt(
    { name: 'RSA-OAEP' },
    cryptoKey,
    encryptedArray.buffer
  )
  return new TextDecoder().decode(decryptedData)
}

async function runAPI() {
  const encryptedData = 'b231019b3852964a778ecce72fcf6e0e79f162f6ce93d29e71994882bfeec2dd27629e43c3c0f305caec95eace930a2d7c24170d1f1d299c4fc37830487a2e3266f5d85cd408b2b824ff508179fda016b6d7b5786eaa01b21cc38c8b7496eddd8255e210c72d7d9ca2f0920870f44a0e7aa1de300d97aa02b2a739c8c3b794a05a28e0c369e4202ccef1691105d9153a540ff7268f0da225b74d323ab14fae7d108f4805c00248f99f942b725520b225aca307ede597577d2ee19e3b6dec485379d43f20651de0a029291e51c27e79f1aafec5bd745d15498170a8c4021be5a1ae75c3cf23618d5f197abd7f115d240302c1eb70e88445a5f897a7abab54f97d'
  const privateKey = {
    alg: "RSA-OAEP-256",
    d: "KcC5GDc-kKEqOzvj6pG5F-z10BR3Iu-ZrI4mRSNyy69G5M9enLkwhwzqwn-CD1xEMirI1Smrq4_KTII9KwBT0o6XFyL7paKnEngqTrGFkOLmE1EIGoBu_YGUhguTC1m50hiNiTQ5hH-H5cbMP4xPaxXSseMQf4pqWph-1emHBDPCCWmUh3E5uvnxox6cc5hUs0CgP7_uSdhFXwu9kZuLDP6gH__7Q6cAxodCD6dKxw3Dpigvt4Lrh5j8UZYpgWYfxxtwAeVoRdgmg8R9Np5mcGre228IAH2aY1gsUFaFRj40UihBau8NrQX_11hPlBoAobsoRcgrXEnQOcYHBJ0fgQ",
    dp: "7po3Fu-uOLH1LUyG-3_fHrp5yiFvExWwlkCN3KzD5yqJQf7U8HdEMSb7c97FvWC_9l7jT2j92WB6CrJWpjl1fhYeVss5KYxdZOk2YJ4k4g3DTTYv_e-qZgOYJVgsHntvgpGvsVkhCUwpWgfx9x8jWJytaJm-5XwOawUYPtsoaYE",
    dq: "ZVSxih0pWfKQ6vSWoKaVZJEURBhKj-Jn7E50ZUaScGezJUFaU-NBKc3Bc2YRAIz7pjeQ2Kcu_vNtswe9HBHqOsIwQ0-yOnp6VfJxP7y5KwJ_ObUHZS11_430dRrzSOIXcpiDommoADlbCVRZSAG9lC--dntoNm-WQs8INUDPcGU",
    e: "AQAB",
    ext: true,
    key_ops: [
      "decrypt"
    ],
    kty: "RSA",
    n: "wWAI2HMcTSwc6sEJQxEUwNqATcLbBQ0-qWvUYyKGoyqIrkuzjFIxaVggxU7OdGxJPbxpQPvYVIMx8j4Ha_fo97-yh0T8rGDyFLyiHOy_H4hKJEr-6kXp1k9d5VE0QVLC7gh6ZqCSn9riSmv8rW7DUfLX_Gngell1kOrHGfVcbqq1A0bp0RFDK__UPIz1HYRnB07Gj18OgYKi9N-yYpcHcZ27rcnmTdtaUeAd0jCQprx4mC5-EbmyLYtf-y4DOeHty8XFZTDocd4hVuqSZQxHgd4GcgyZzoNktThM2CUbOSDbi9qcaviiklPrCuuWxfVHeJnO-sQ7zJ2vFHJe3qExXQ",
    p: "-FA4htxvOX2ILAp07j8u8m_b_CzzDOwWZAYpy4FEQQD8SV5ZJ4nmv7XFv-Sn9Qi-3UEfarZBOzCws5F3ItruwPKYRMn9bxdOLaurUmMInF-aH2fJ5raXr7qoMCIF9lK1vMyqhZW2sMIpzIH4ukltT7fTujSqkkbdF7sAwYQTC0E",
    q: "x1xzi3PRmwgpHKOFej3ZtMAqdjedYrFDoIm5J_5GvdrglTAdDzSotmgJK2jh3wvEeuUWS9pHUbgt-eDYcWzguAwS0yQ3cSdkhG-8Yy8vo2BCH-Uz4k-obYdEMs9FftqdQkDdSxYNR22zJ13FbTDWAAaJkN8qrKcsNzhVD7lVKx0",
    qi: "abv81rRW-PJjTV1p8fX-jRSxd06SmxVtXl_6Zyh4idq53Xe1CmXw2KBwzuxhbw0S7Nr7dzKzqfBB-NeqbSPABG-8i4U2VMCm41yX85lMID7d5L3KqLUarjh_5W-olCvITBAUCYN3YevijmXpz_rBb_L4EQUUnZdYCaM6xxCLksk"
  }
  
  const decryptedData = await decryptRSA(encryptedData, privateKey)
  
  fetch('https://api.openweathermap.org/data/2.5/weather?q=Bruxelles,be&APPID='+decryptedData+'&lang=fr')
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
  .catch(error => console.error('Error:', error))
}

runAPI()