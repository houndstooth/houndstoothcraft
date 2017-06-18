import ctx from './ctx'
import colorUtilities from '../utilities/colorUtilities'

export default ({ shapeColor, coordinates }) => {
	if (!coordinates.length) return

	ctx.fillStyle = colorUtilities.parseColor({ color: shapeColor })
	ctx.beginPath()

	ctx.moveTo(coordinates[ 0 ][ 0 ], coordinates[ 0 ][ 1 ])
	coordinates.slice(1).forEach(coordinate => ctx.lineTo(coordinate[ 0 ], coordinate[ 1 ]))

	ctx.closePath()
	ctx.fill()
}
