const seps = [".", "'", "."]

export function format(number) {
    let n = number.toString()
    let part1, part2

    seps.forEach((s, i) => {
        const l = (i+1) * 3

        if (n.length > l) {
            part1 = n.slice(0, -l-i)
            part2 = n.slice(-l-i)
            n = part1 + s + part2
        }
    })

    return n
}

export function mult(num1, num2) {
    let a1 = num1
    let a2 = num2
    let n1 = ""
    let n2 = ""

    seps.forEach(s => {
        const sep1 = a1.toString().split(s)
        sep1.forEach(part => n1 += part)
        a1 = n1
        n1 = ""

        const sep2 = a2.toString().split(s)
        sep2.forEach(part => n2 += part)
        a2 = n2
        n2 = ""
    })

    let result = a1 * a2

    return result
}