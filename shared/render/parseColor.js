export default ({ color }) => {
    const { r, g, b, a } = color
    let colorString = 'rgba(' + [r, g, b, a].join(', ') + ')'
    return colorString
}