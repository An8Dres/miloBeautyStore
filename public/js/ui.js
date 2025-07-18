import { header, main, counter } from './dom.js'
import { add, goBag } from './addToBag.js'
import { whatsapp } from './whatsapp.js'

const findCounter = localStorage.getItem('counter')
let lastScroll = 0
let time

export function setupUI() {
    if (findCounter) {
        counter.innerText = findCounter
        counter.classList.remove('disabled')
    }

    header.onclick = e => {
        const i = e.target

        if (i.tagName == 'A') {
            header.querySelector('.a_selected').classList.remove('a_selected')
            i.classList.add('a_selected')
        } else 
        if (i.closest('#btn_bag')){
            goBag()
        }
    }

    main.onclick = e => {
        const i = e.target
        const articulo = i.closest('.articulo')

        if (i.closest('.btn_buy')) {
            const nombre = articulo.querySelector('p').innerText
            whatsapp(`Hola Milo, estoy interesada en ${nombre}\n¿Está disponible?`)
        } 
        else if (i.closest('.btn_add')) {
            const id = articulo.dataset.id
            add(id, animationBag)
        }
    }

    window.onscroll = () => {
        const currentScroll = window.scrollY
        header.style.translate = currentScroll > lastScroll ? '0 -100%' : '0'
        lastScroll = currentScroll
    }
}

function animationBag() {
    clearTimeout(time)

    const isHeaderOcult = header.style.translate.split('-')[1]
    header.style.translate = 0

    if (isHeaderOcult) {
        setTimeout(() => {
            counter.style.scale = 1.2
            time = setTimeout(() => { counter.style.scale = 1 }, 150)
        }, 200)
    } else {
        counter.style.scale = 1.2
        time = setTimeout(() => { counter.style.scale = 1 }, 150)
    }
}