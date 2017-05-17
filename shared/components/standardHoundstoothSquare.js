import drawStripedSquare from '../render/drawStripedSquare'
import drawSolidSquare from '../render/drawSolidSquare'
import { COLOR_A, COLOR_B } from '../common/customize'
import maybeFlipGrain from '../utilities/maybeFlipGrain'

export default ({ origin, center, size, squareType, scaleFromGridCenter, rotationAboutCenter, rotationAboutOrigin }) => {
	size = size || 1
	const squareFunction = squareType === 'STRIPED_A' || squareType === 'STRIPED_B' ? drawStripedSquare : drawSolidSquare
	const color = squareType
	const initialOriginColor = squareType === 'STRIPED_A' ? COLOR_A : COLOR_B
	const initialOtherColor = initialOriginColor === COLOR_A ? COLOR_B : COLOR_A

	const { originColor, otherColor } = maybeFlipGrain({originColor: initialOriginColor, otherColor: initialOtherColor})

	squareFunction({
		origin,
		center,
		size,
		color,
		originColor,
		otherColor,
		scaleFromGridCenter,
		rotationAboutCenter,
		rotationAboutOrigin
	})
}