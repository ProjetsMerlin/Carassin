async function runToAspire(url, part) {
    try {
        const response = await fetch(url)
        if (!response.ok) {
            throw new Error('Network response was not ok')
        }
        const
        html = await response.text(),
        parser = new DOMParser(),
        newHtml = parser.parseFromString(html, 'text/html'),
        section = newHtml.querySelector(part)
        
        if (section) {
            return section
        }
        else {
            console.log('élément nont trouvé')
            return null
        }
    }
    catch (error) {
        console.error(error)
        return null
    }
}

function createElement(element, data, parent) {
    var element = document.createElement(element)
    element.textContent = data
    return parent.appendChild(element)
}

function runHtml(data) {
    [data].forEach(function(items) {
        items.forEach(function(item) {
            var a = document.createElement('a')
            a.href = item.link.replace(local, website)
            a.target = "_blank"
            a.classList.add('card')
            createElement('h2', item.title, a)
            createElement('span', item.hour, a)
            createElement('p', item.description, a)
            var img = document.createElement('img')
            img.src = item.img.replace(local, website)
            a.appendChild(img)
            article.appendChild(a)
        })
    })
}

const
//local = "http://localhost",
local = "https://carassin.lintermediaire.be",
website = "https://www.mon-programme-tv.be",
article = document.querySelector('.js_fetdata'),
url = 'fetchWebsite.php',
part = '.thisevening'

runToAspire(url, part).then(content => {
    if (content) {
        const newContent = content.outerHTML.split('<span class="head">Films de la soirée</span>'),
        newHtml = newContent[1].split('<span class="head">Séries de la soirée</span>')[0],
        tempDiv = document.createElement('section')
        tempDiv.innerHTML = newHtml
        
        const newHtmlElement = tempDiv,
        itemElements = newHtmlElement.querySelectorAll('.item'),
        items = []

        itemElements.forEach(itemElement => {
            const item = {
                title: itemElement.querySelector('.details a').textContent,
                hour: itemElement.querySelector('.hour').textContent,
                description: itemElement.querySelector('.details span').textContent,
                link: itemElement.querySelector('.details a').href,
                img: itemElement.querySelector('.evchaine img').src,
            }
            items.push(item)
        })
        console.log( items )
        
        runHtml(items)
    }
})