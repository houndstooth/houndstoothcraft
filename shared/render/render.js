import ctx from './ctx'

export default ({ color, coordinates }) => {
	ctx.fillStyle = color
	ctx.beginPath()

	ctx.moveTo(coordinates[ 0 ][ 0 ], coordinates[ 0 ][ 1 ])
	coordinates.forEach(coordinate => ctx.lineTo(coordinate[ 0 ], coordinate[ 1 ]))

	ctx.closePath()
	ctx.fill()
}