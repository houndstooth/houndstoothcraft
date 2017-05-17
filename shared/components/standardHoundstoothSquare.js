import drawStripedSquare from '../render/drawStripedSquare'
import maybeFlipGrain from '../utilities/maybeFlipGrain'

export default ({ origin, center, size, originColor: initialOriginColor, otherColor: initialOtherColor, scaleFromGridCenter, rotationAboutCenter, rotationAboutOrigin }) => {
	size = size || 1

	const { originColor, otherColor } = maybeFlipGrain({
		originColor: initialOriginColor,
		otherColor: initialOtherColor
	})

	drawStripedSquare({
		origin,
		center,
		size,
		originColor,
		otherColor,
		scaleFromGridCenter,
		rotationAboutCenter,
		rotationAboutOrigin
	})
}