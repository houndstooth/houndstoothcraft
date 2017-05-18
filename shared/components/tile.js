import { UNIT, SQUARE_SIZE } from '../common/customize'
import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import maybeFlipGrain from '../utilities/maybeFlipGrain'
import maybeMixColors from '../utilities/maybeMixColors'
import drawStandardStripes from '../../standard/render/drawStandardStripes'
import drawHarmonicShrinkingStripes from '../../gingham-chevron-continuum/render/drawHarmonicShrinkingStripes'
import calculateColors from '../utilities/calculateColors'

export default ({
					x,
					y,
					center: initialCenter,
					size,
					originColor: providedOriginColor,
					otherColor: providedOtherColor,
					scaleFromGridCenter,
					rotationAboutCenter,
					rotationAboutOrigin,
					harmonicShrinkingStripes
				}) => {

	size = size || SQUARE_SIZE
	const sizedUnit = size * UNIT
	const { origin, center } = calculateOriginAndCenter({
		x,
		y,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

	let initialOriginColor, initialOtherColor
	if (!providedOriginColor) {
		const { originColor: calculatedOriginColor, otherColor: calculatedOtherColor } = calculateColors({ x, y })
		initialOriginColor = calculatedOriginColor
		initialOtherColor = calculatedOtherColor
	} else {
		initialOriginColor = providedOriginColor
		initialOtherColor = providedOtherColor
	}

	let { originColor: nextOriginColor, otherColor: nextOtherColor } = maybeFlipGrain({
		originColor: initialOriginColor,
		otherColor: initialOtherColor
	})
	const { originColor, otherColor } = maybeMixColors({
		originColor: nextOriginColor,
		otherColor: nextOtherColor
	})

	const stripesFunction = harmonicShrinkingStripes ? drawHarmonicShrinkingStripes : drawStandardStripes
	stripesFunction({
		sizedUnit,
		center,
		origin,
		rotationAboutCenter,
		rotationAboutOrigin,
		originColor,
		otherColor,
		harmonicShrinkingStripes
	})
}