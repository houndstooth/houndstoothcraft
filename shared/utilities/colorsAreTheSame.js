export default ({ colors }) => {
    const colorOne = colors[0]
    const colorTwo = colors[1]
    if (colorOne.r !== colorTwo.r) return false
    if (colorOne.g !== colorTwo.g) return false
    if (colorOne.b !== colorTwo.b) return false
    if (colorOne.a !== colorTwo.a) return false
    return true
}