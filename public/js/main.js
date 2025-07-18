import { setupUI } from "./ui.js"
import { initLoad } from "./productLoader.js"


document.addEventListener('DOMContentLoaded', () => {
    initLoad()
    setupUI()
})