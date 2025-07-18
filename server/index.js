import express from 'express'

const app = express()
const port = 5500

const productos = [
  {
    nombre: "serum-de-arroz-bioaqua-bqy60582",
    titulo: "Serum de Arroz BioAqua BQY60582",
    descripcion: "Una silla cómoda para jugar muchas horas.",
    imagen: "https://example.com/img/silla-gamer-roja.png"
  }
]

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/public/index.html')
})

app.get('/:slug', (req, res) => {
    const slug = req.params.slug
    if (slug == "productos") return res.send("Productos")
    const producto = productos.find(p => p.nombre === slug)

    if (!producto) return res.status(404).send('No encontrado')

    res.send(`
        <html>
        <head>
            <title>${producto.titulo}</title>
            <meta property="og:title" content="${producto.titulo}" />
            <meta property="og:description" content="${producto.descripcion}" />
            <meta property="og:image" content="${producto.imagen}" />
            <link rel="preload" href="fonts/Poppins/Poppins-Medium.woff2" as="font" type="font/woff2" crossorigin="anonymous">
            <link rel="stylesheet" href="style.css">
            <link rel="icon" type="image/png" href="src/favicon.png">
            <title>Milo Beauty Store</title>
        </head>
        <body>
            <header>
                <picture>
                    <source srcset="src/logo/logo-120.avif" type="image/avif">
                    <img id="logo" src="src/logo/logo-120.webp" alt="Un corazón celeste con una corona que dice Beauty Store by Milo y un labial a la izquierda">
                </picture>
                <nav>
                    <a href="/">Home</a>
                    <a href="productos" class="a_selected">Productos</a>
                    <a href="maquillaje">Maquillaje</a>
                    <a href="accesorios">Accesorios</a>
                    <svg id="search" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M380-320q-109 0-184.5-75.5T120-580q0-109 75.5-184.5T380-840q109 0 184.5 75.5T640-580q0 44-14 83t-38 69l224 224q11 11 11 28t-11 28q-11 11-28 11t-28-11L532-372q-30 24-69 38t-83 14Zm0-80q75 0 127.5-52.5T560-580q0-75-52.5-127.5T380-760q-75 0-127.5 52.5T200-580q0 75 52.5 127.5T380-400Z"/></svg>
                </nav>
                <section>
                    <button aria-label="Abrir bolsa" id="btn_bag">
                        <svg area-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M226.67-80q-27 0-46.84-19.83Q160-119.67 160-146.67v-506.66q0-27 19.83-46.84Q199.67-720 226.67-720h100v-6.67q0-64 44.66-108.66Q416-880 480-880t108.67 44.67q44.66 44.66 44.66 108.66v6.67h100q27 0 46.84 19.83Q800-680.33 800-653.33v506.66q0 27-19.83 46.84Q760.33-80 733.33-80H226.67Zm0-66.67h506.66v-506.66h-100v86.66q0 14.17-9.61 23.75-9.62 9.59-23.84 9.59-14.21 0-23.71-9.59-9.5-9.58-9.5-23.75v-86.66H393.33v86.66q0 14.17-9.61 23.75-9.62 9.59-23.84 9.59-14.21 0-23.71-9.59-9.5-9.58-9.5-23.75v-86.66h-100v506.66ZM393.33-720h173.34v-6.67q0-36.33-25.17-61.5-25.17-25.16-61.5-25.16t-61.5 25.16q-25.17 25.17-25.17 61.5v6.67ZM226.67-146.67v-506.66 506.66Z"/></svg>
                        <i id="counter" class="disabled">0</i>
                    </button>
                    <button aria-label="Cuenta" id="btn_account">
                        <!-- <img src="src/yo.webp"> -->
                        <svg aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960"><path d="M226-262q59-42.33 121.33-65.5 62.34-23.17 132.67-23.17 70.33 0 133 23.17T734.67-262q41-49.67 59.83-103.67T813.33-480q0-141-96.16-237.17Q621-813.33 480-813.33t-237.17 96.16Q146.67-621 146.67-480q0 60.33 19.16 114.33Q185-311.67 226-262Zm253.88-184.67q-58.21 0-98.05-39.95Q342-526.58 342-584.79t39.96-98.04q39.95-39.84 98.16-39.84 58.21 0 98.05 39.96Q618-642.75 618-584.54t-39.96 98.04q-39.95 39.83-98.16 39.83ZM480.31-80q-82.64 0-155.64-31.5-73-31.5-127.34-85.83Q143-251.67 111.5-324.51T80-480.18q0-82.82 31.5-155.49 31.5-72.66 85.83-127Q251.67-817 324.51-848.5T480.18-880q82.82 0 155.49 31.5 72.66 31.5 127 85.83Q817-708.33 848.5-635.65 880-562.96 880-480.31q0 82.64-31.5 155.64-31.5 73-85.83 127.34Q708.33-143 635.65-111.5 562.96-80 480.31-80Zm-.31-66.67q54.33 0 105-15.83t97.67-52.17q-47-33.66-98-51.5Q533.67-284 480-284t-104.67 17.83q-51 17.84-98 51.5 47 36.34 97.67 52.17 50.67 15.83 105 15.83Zm0-366.66q31.33 0 51.33-20t20-51.34q0-31.33-20-51.33T480-656q-31.33 0-51.33 20t-20 51.33q0 31.34 20 51.34 20 20 51.33 20Zm0-71.34Zm0 369.34Z"/></svg>
                    </button>
                </section>
            </header>
            <section class="main">
            </section>
            <article class="loader">
                <svg class="loading" width="60" height="60" viewBox="0 0 50 50"><circle cx="25" cy="25" r="20" fill="none" stroke="var(--color2)" stroke-width="4" stroke-linecap="round" stroke-dasharray="60 120"><animateTransform attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="1s" repeatCount="indefinite"></animateTransform></circle></svg>
                <p class="load_msg" class="disabled"></p>
            </article>
            <button id="btn_whatsapp" onclick="whatsapp('Hola, quiero más información 😁')">
                <img src="src/whatsapp.svg" alt="ícono de whatsapp: telefono de color blanco y un circulo alrededor blanco con fondo verde">
            </button>
        </body>
        </html>
    `)
})

app.listen(port, () => {
    console.log("Server listen on port", port)
})