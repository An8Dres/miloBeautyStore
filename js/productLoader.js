import { main, loader, msg } from './dom.js'

export let products = []
let nowIndex = 0
const perLoad = 20
let isLoading = false
let trying = 0

export function initLoad() {
    fetch('src/json/products.json')
    .then(res => res.json())
    .then(data => {
        products = data
        loadMoreProducts() 
        window.addEventListener('scroll', loadOnScroll)
    })
}

function loadMoreProducts() {
    if (isLoading) return
    if (nowIndex >= products.length) {
        trying++
        msg.classList.remove('disabled')
        loader.classList.add('disabled')
        let text = "Ya no hay más productos :("
        // if (trying >= 130) text = "Te amo mi amorcito, luego añado más ❣️"
        // else if (trying >= 90) text = "Que más buscas cariño..?"
        // else if (trying >= 60) text = "Besito mi cielo"
        // else if (trying >= 35) text = "No haces caso amor, necia"
        // else if (trying >= 15) text = "Ya deja de scrollear mi amor jasjaj"
        if (trying >= 10) text = "No me regañes por trasnochar\nTe amo cielo ❣️"
        return msg.innerText = text
    }

    isLoading = true
    loader.style.visibility = 'visible'

    const final = nowIndex + perLoad
    const items = products.slice(nowIndex, final)
    const tpl = document.getElementById('producto')

    items.forEach(producto => {
        const clon = tpl.content.cloneNode(true)
    
        clon.querySelector('article').dataset.id = producto.id
        clon.querySelector('source').srcset = `src/pdts/avif/front/${producto.id}.avif`
        clon.querySelector('img').src = `src/pdts/webp/front/${producto.id}.webp`
        clon.querySelector('.nombre').textContent = producto.name
        clon.querySelector('.precio').textContent = producto.price

        main.appendChild(clon)
    })

    nowIndex = final
    isLoading = false
    loader.style.visibility = 'hidden'
}

function loadOnScroll() {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement
    if (scrollTop + clientHeight >= scrollHeight - 100) loadMoreProducts()
}