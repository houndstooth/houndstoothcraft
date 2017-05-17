import drawStripedSquare from '../render/drawStripedSquare'
import drawSolidSquare from '../render/drawSolidSquare'
import { COLOR_A, COLOR_B } from '../common/customize'

export default ({ origin, size, squareType, scaleFromGridCenter, rotationAboutCenter, rotationAboutOrigin }) => {
	size = size || 1
	const squareFunction = squareType == 'STRIPED_A' || squareType == 'STRIPED_B' ? drawStripedSquare : drawSolidSquare
	const color = squareType
	const originColor = squareType == 'STRIPED_A' ? COLOR_A : COLOR_B
	const otherColor = originColor == COLOR_A ? COLOR_B : COLOR_A

	squareFunction({
		origin,
		size,
		color,
		originColor,
		otherColor,
		scaleFromGridCenter,
		rotationAboutCenter,
		rotationAboutOrigin
	})
}