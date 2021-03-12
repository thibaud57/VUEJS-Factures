export default (value) => {
    const date = new Date(value)
    return date.toLocaleDateString(['en-FR'], {day: '2-digit', month:'2-digit', year:'2-digit'})
}