import { UNIT } from '../common/customize'
import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import maybeFlipGrain from '../utilities/maybeFlipGrain'
import maybeMixColors from '../utilities/maybeMixColors'
import drawStandardStripes from './drawStandardStripes'
import drawHarmonicShrinkingStripes from '../../gingham-chevron-continuum/render/drawHarmonicShrinkingStripes'

export default ({
					origin: initialOrigin,
					center: initialCenter,
					size,
					originColor: initialOriginColor,
					otherColor: initialOtherColor,
					scaleFromGridCenter,
					rotationAboutCenter,
					rotationAboutOrigin,
					harmonicShrinkingStripes
				}) => {
	size = size || 1
	const sizedUnit = size * UNIT
	const { origin, center } = calculateOriginAndCenter({
		initialOrigin,
		initialCenter,
		scaleFromGridCenter,
		sizedUnit
	})

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