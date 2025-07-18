import { counter } from "./dom.js"
import { whatsapp } from "./whatsapp.js"
import { products } from "./productLoader.js"
import { format, mult } from "./format.js"

let idProducts = []
let count = 0

const productsSaved = localStorage.getItem('products')

if(productsSaved) {
    idProducts = JSON.parse(productsSaved)
    count = localStorage.getItem('counter')
}

//Format of saved: id - x - #number
// Example --> 001x5  (Five products 001)

export function add(id, callBackAnimation = null) {
    const idFound = idProducts.find(p => id == p.split('x')[0])
    count++
    
    if (idFound) {
        let veces = idFound.split('x')[1]
        veces = parseInt(veces) + 1
        idProducts[idProducts.indexOf(idFound)] = `${id}x${veces}`
    } else {
        idProducts.push(id + "x1")
    }

    localStorage.setItem('products', JSON.stringify(idProducts))
    localStorage.setItem('counter', count)

    counter.innerText = count
    counter.classList.remove('disabled')

    if (callBackAnimation) callBackAnimation()
}

export function goBag() {
    if(!localStorage.getItem('counter')) return

    let txt = "Hola Milo! Deseo comprar:\n"
    let total = 0

    idProducts.forEach(ids => {
        const separate = ids.split('x')
        let id = separate[0]
        let times = separate[1]
        let product = products.find(p => p.id == id)
        let pTotal = mult(product.price, times)
        total += pTotal
        txt += `    ${product.name} - $${product.price} x${times} ($${format(pTotal)})\n`
    })

    txt += "Total a pagar: $" + format(total)

    localStorage.removeItem('products')
    localStorage.removeItem('counter')
    counter.classList.add('disabled')
    idProducts = []
    count = 0
    whatsapp(txt)
}