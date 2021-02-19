export const isValidImage = value => {
    if(!value) return true
    if(typeof value !=='string') return false

    const validFormats = ['jpeg', 'jpg', 'png', 'svg']
    const extension = value.split('.').pop()
    return validFormats.includes(extension)
}

export const isValidUrl = value => {
    if(!value) return true
    if(typeof value !=='string') return false

    const pattern = /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi
    const regex = new RegExp(pattern)

    return value.match(regex) ? true : false
}

export const matchPassword = (getValues, field) => value => {
    if(!value) return true
    if(typeof value !=='string') return false

    const compare = getValues()[field]
    return compare === value
}