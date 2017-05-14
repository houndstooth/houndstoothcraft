import ctx from './ctx'

export default ({ color, coordinates, customContext }) => {
    const context = customContext ? customContext : ctx

    context.fillStyle = color
    context.beginPath()

    context.moveTo(coordinates[ 0 ][ 0 ], coordinates[ 0 ][ 1 ])
    coordinates.forEach(coordinate => context.lineTo(coordinate[ 0 ], coordinate[ 1 ]))

    context.closePath()
    context.fill()
}