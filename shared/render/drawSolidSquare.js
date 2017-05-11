import { UNIT } from '../common/customize'

export default ({ctx, origin, size}) => {
	ctx.beginPath()

	ctx.moveTo(
		origin[ 0 ],
		origin[ 1 ]
	)
	ctx.lineTo(
		origin[ 0 ] + (UNIT * size),
		origin[ 1 ]
	)
	ctx.lineTo(
		origin[ 0 ] + (UNIT * size),
		origin[ 1 ] + (UNIT * size)
	)
	ctx.lineTo(
		origin[ 0 ],
		origin[ 1 ] + (UNIT * size)
	)

	ctx.closePath()
	ctx.fill()
}