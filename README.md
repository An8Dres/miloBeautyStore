<script>
    const list = []

    function organizar(string) {
        let allSongs = string.split('*')

        allSongs.forEach((item, index) => {
            if (index == 0) return

            const s = item.trim().split('-')
            const singer = s[1].trim()
            const song = s[0].trim()

            const foundSinger = list.find(o => o.singer == singer)

            if (foundSinger) {
                foundSinger.songs.push(song)
            } else {
                const obj = {
                    singer: singer,
                    songs: [song]
                }

                list.push(obj)
            }
        })

        const tonalidad = allSongs[0].trim()

        let result = `*${tonalidad}*\n`

        list.forEach(o => {
            result += `*· ${o.singer}*\n`
            o.songs.forEach(s => result += `    ${s}\n`)
            result += "\n"
        })

        const p = document.createElement('pre')
        p.innerText = result
        document.body.appendChild(p)
    }
</script>