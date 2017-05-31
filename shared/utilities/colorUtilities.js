import state from '../state/state'
import maybeRealignColors from '../../gingham-chevron-continuum/maybeRealignColors'
import gridUtilities from './gridUtilities'

const calculateColors = ({ origin, colors, color }) => {
	const { ginghamMode, ginghamChevronContinuum } = state.shared.stripeCount

	if (!colors) {
		colors = gridUtilities.calculateSetForTile({ origin, grid: color })
	}

	if (ginghamMode) {
		colors = mixColors({ colors })
	} else if (ginghamChevronContinuum.on) {
		colors = maybeRealignColors({ colors, origin })
	}
	
	if (color.opacity < 1) colors = fadeColors({ colors })

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

const fadeColors = ({ colors }) => colors.map(color => Object.assign({}, color, { a: color.a * state.shared.color.opacity }))

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

export default {
	calculateColors,
	allColorsAreTheSame
}