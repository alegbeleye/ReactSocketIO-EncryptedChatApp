

const reflect = (char) => {
    const mid = 79
    const ascii = char.charCodeAt(0)

    if (ascii > 126 || ascii < 32) {
        String.fromCharCode(ascii)
    }

    let newAscii = 0
    if (ascii > mid) {
        newAscii = mid - (ascii - mid)
    }

    else if (ascii < mid) {
        newAscii = mid + (mid - ascii)
    }

    else {
        newAscii = mid
    }

    return (String.fromCharCode(newAscii))
}

export const encode = (msg) => {
    const msgArr = msg.split("")
    const newMsgArr = msgArr.map((char) => { return reflect(char) })

    return newMsgArr.join("")
}



export const decode = (msg, timer) => {
    if (timer !== 0) {
        return encode(msg)
    }

    return msg

}