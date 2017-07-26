import componentUtilities from './componentUtilities'
import codeUtilities from './codeUtilities'
import store from '../../store'

const parseColor = ({ r, g, b, a }) => `rgba(${  [ r, g, b, a ].join(',')  })`

const getColorsForTile = ({ gridAddress, colorSettings }) => {
	colorSettings = colorSettings || store.mainHoundstooth.basePattern.colorSettings
	let tileColors = componentUtilities.getSetForTile({ gridAddress, settings: colorSettings })

	const { stripeCountMode } = store.mainHoundstooth.basePattern.stripeSettings.stripePositionSettings || {}
	if (stripeCountMode === 'GINGHAM') tileColors = mixColors({ colors: tileColors })

	const opacity = colorSettings.opacity
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
		a: totalColor.a / colorsCount,
	} ]
}

const fadeColors = ({ colors, opacity }) => colors.map(color => {
	return Object.assign({}, color, { a: color.a * opacity })
})

const allColorsAreTheSame = (colors) => {
	for (let i = 0; i < colors.length - 1; i++) {
		if (!codeUtilities.shallowEqual(colors[ i ], colors[ i + 1 ])) return false
	}
	return true
}

const isTileUniform = ({ tileColors }) => allColorsAreTheSame(tileColors)

export default {
	getColorsForTile,
	isTileUniform,
	allColorsAreTheSame,
	parseColor,
}
