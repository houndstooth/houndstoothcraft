import state from '../state/state'
import gridUtilities from './gridUtilities'
import allOrientationsAreTheSame from '../../houndazzle/allOrientationsAreTheSame'

const calculateColors = ({ address, colors, colorConfig }) => {
	const { mode } = state.shared.stripeCountConfig

	if (!colors) colors = gridUtilities.calculateSetForTile({ address, config: colorConfig, gccOn: mode === 'GINGHAM_CHEVRON_CONTINUUM' })
	if (mode === 'GINGHAM') colors = mixColors({ colors })

	const opacity = colorConfig && colorConfig.opacity || state.shared.colorConfig.opacity
	if (opacity < 1) colors = fadeColors({ colors, opacity })

	return colors
}

const mixColors = ({ colors }) => {
	const totalColor = { r: 0, g: 0, b: 0, a: 0 }
	colors.forEach(color => {
		totalColor.r += color.r || 0
		totalColor.g += color.g || 0
		totalColor.b += color.b || 0
		totalColor.a += color.a
	})

	const colorsCount = colors.length
	return [ {
		r: Math.floor(totalColor.r / colorsCount),
		g: Math.floor(totalColor.g / colorsCount),
		b: Math.floor(totalColor.b / colorsCount),
		a: totalColor.a / colorsCount
	} ]
}

const fadeColors = ({ colors, opacity }) => colors.map(color => Object.assign({}, color, { a: color.a * opacity }))

const allColorsAreTheSame = ({ colors }) => {
	for (let i = 0; i < colors.length - 1; i++) {
		if (!colorsAreTheSame({ colorOne: colors[ i ], colorTwo: colors[ i + 1 ] })) return false
	}
	return true
}

const colorsAreTheSame = ({ colorOne, colorTwo }) => {
	return colorOne.a === colorTwo.a && colorsAreTheSameHue({ colorOne, colorTwo })
}

const colorsAreTheSameHue = ({ colorOne, colorTwo }) => {
	if (colorOne.r !== colorTwo.r) return false
	if (colorOne.g !== colorTwo.g) return false
	if (colorOne.b !== colorTwo.b) return false
	return true
}

const isTileUniform = ({ colors, dazzle }) => {
	return allColorsAreTheSame({ colors }) &&
		allColorsAreTheSame({ colors: dazzle.colors }) &&
		allOrientationsAreTheSame({ orientations: dazzle.orientations })
}

export default {
	calculateColors,
	isTileUniform
}