import state from '../state/state'
import gridUtilities from './gridUtilities'
import allOrientationsAreTheSame from '../effects/houndazzle/allOrientationsAreTheSame'

const parseColor = ({ color: { r, g, b, a } }) => 'rgba(' + [ r, g, b, a ].join(', ') + ')'

const getColorsForTile = ({ address, colorConfig }) => {
	const { mode } = state.stripeCountConfig

	let tileColors = gridUtilities.getSetForTile({ address, config: colorConfig })
	if (mode === 'GINGHAM') tileColors = mixColors({ colors: tileColors })

	const opacity = colorConfig && colorConfig.opacity || state.colorConfig.opacity
	if (opacity < 1) tileColors = fadeColors({ colors: tileColors, opacity })

	return tileColors
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

const isTileUniform = ({ tileColors, tileDazzle }) => {
	const colorsAreTheSame = allColorsAreTheSame({ colors: tileColors })
	if (state.colorConfig.mode === 'HOUNDAZZLE') {
		return colorsAreTheSame &&
			allColorsAreTheSame({ colors: tileDazzle.tileColors }) &&
			allOrientationsAreTheSame({ orientations: tileDazzle.tileOrientations })
	} else {
		return colorsAreTheSame
	}
}

export default {
	getColorsForTile,
	isTileUniform,
	parseColor
}
