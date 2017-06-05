import ctx from './ctx'

const parseColor = ({ color: { r, g, b, a } }) => 'rgba(' + [ r, g, b, a ].join(', ') + ')'

export default ({ color, coordinates }) => {
	if (!coordinates.length) return

	ctx.fillStyle = parseColor({ color })
	ctx.beginPath()

	ctx.moveTo(coordinates[ 0 ][ 0 ], coordinates[ 0 ][ 1 ])
	coordinates.forEach(coordinate => ctx.lineTo(coordinate[ 0 ], coordinate[ 1 ]))

	ctx.closePath()
	ctx.fill()
}
