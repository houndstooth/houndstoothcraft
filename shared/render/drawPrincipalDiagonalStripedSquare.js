import ctx from './ctx'
import { UNIT } from '../common/customize'

export default ({ origin, size, originColor, otherColor }) => {
	const sizedUnit = size * UNIT

	ctx.beginPath()
	//top right (move to)
	ctx.moveTo(origin[ 0 ] + sizedUnit, origin[ 1 ])
	//top middle
	ctx.lineTo(origin[ 0 ] + sizedUnit / 2, origin[ 1 ])
	//middle right
	ctx.lineTo(origin[ 0 ] + sizedUnit, origin[ 1 ] + sizedUnit / 2)
	//close and fill origin color
	ctx.closePath()
	ctx.fillStyle = originColor
	ctx.fill()

	ctx.beginPath()
	//top middle (move to)
	ctx.moveTo(origin[ 0 ] + sizedUnit / 2, origin[ 1 ])
	//top left
	ctx.lineTo(origin[ 0 ], origin[ 1 ])
	//bottom right
	ctx.lineTo(origin[ 0 ] + sizedUnit, origin[ 1 ] + sizedUnit)
	//middle right
	ctx.lineTo(origin[ 0 ] + sizedUnit, origin[ 1 ] + sizedUnit / 2)
	//close and fill other color
	ctx.closePath()
	ctx.fillStyle = otherColor
	ctx.fill()

	ctx.beginPath()
	//bottom right (move to)
	ctx.moveTo(origin[ 0 ] + sizedUnit, origin[ 1 ] + sizedUnit)
	//top left
	ctx.lineTo(origin[ 0 ], origin[ 1 ])
	//middle left
	ctx.lineTo(origin[ 0 ], origin[ 1 ] + sizedUnit / 2)
	//bottom middle
	ctx.lineTo(origin[ 0 ] + sizedUnit / 2, origin[ 1 ] + sizedUnit)
	//close and fill origin color
	ctx.closePath()
	ctx.fillStyle = originColor
	ctx.fill()

	ctx.beginPath()
	//bottom middle (move to)
	ctx.moveTo(origin[ 0 ] + sizedUnit / 2, origin[ 1 ] + sizedUnit)
	//middle left
	ctx.lineTo(origin[ 0 ], origin[ 1 ] + sizedUnit / 2)
	//bottom left
	ctx.lineTo(origin[ 0 ], origin[ 1 ] + sizedUnit)
	//close and fill other color
	ctx.closePath()
	ctx.fillStyle = otherColor
	ctx.fill()
}