import { UNIT, SQUARE_SIZE, FLIP_GRAIN } from '../common/customize'
import calculateOriginAndCenter from '../utilities/calculateOriginAndCenter'
import maybeMixColors from '../utilities/maybeMixColors'
import drawStandardStripes from '../../standard/render/drawStandardStripes'
import drawHarmonicShrinkingStripes from '../../gingham-chevron-continuum/render/drawHarmonicShrinkingStripes'
import calculateColors from '../utilities/calculateColors'

export default ({
					x,
					y,
					center: initialCenter,
					size,
					colors,
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

	if (!colors) colors = calculateColors({ x, y })
	colors = FLIP_GRAIN ? colors.reverse() : colors
	colors = maybeMixColors({ colors })

	const stripesFunction = harmonicShrinkingStripes ? drawHarmonicShrinkingStripes : drawStandardStripes
	stripesFunction({
		sizedUnit,
		center,
		origin,
		rotationAboutCenter,
		rotationAboutOrigin,
		colors,
		harmonicShrinkingStripes
	})
}