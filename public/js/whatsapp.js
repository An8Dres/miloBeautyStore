export function whatsapp(txt) {
    const url = `https://wa.me/573218669435?text=${encodeURIComponent(txt)}`;
    window.open(url, '_blank')
}