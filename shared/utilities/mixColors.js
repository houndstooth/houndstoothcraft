import iterator from '../../shared/utilities/iterator'

export default ({ colors }) => {
    let mixedColor = {}

    mixedColor.r = Math.floor((colors[0].r + colors[1].r) / 2)
    mixedColor.g = Math.floor((colors[0].g + colors[1].g) / 2)
    mixedColor.b = Math.floor((colors[0].b + colors[1].b) / 2)
    mixedColor.a = (colors[0].a + colors[1].a) / 2

    return [mixedColor, mixedColor]
}