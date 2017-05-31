import { GONGRAM_SUPERTILE } from '../../gongram/gongramConstants'
import { STANDARD_SUPERTILE, TILE_TYPE_TO_COLORS_INDICES_MAPPING } from '../application/constants'
import state from '../state/state'
import maybeRealignColors from '../../gingham-chevron-continuum/maybeRealignColors'

const calculateColor = ({ colors, stripeIndex, substripeIndex }) => {
	stripeIndex = stripeIndex || 0
	substripeIndex = substripeIndex || 0
	const index = ( stripeIndex + substripeIndex ) % 2
	return colors[ index ]
}

const convertTileTypeToColors = ({ tileType }) => {
	const colorsIndices = TILE_TYPE_TO_COLORS_INDICES_MAPPING[ tileType ].slice()
	return [
		state.shared.color.colors[ colorsIndices[ 0 ] ],
		state.shared.color.colors[ colorsIndices[ 1 ] ]
	]
}

const calculateColors = ({ origin, colors }) => {
	const { stripeCount, color } = state.shared
	const { opacity, colorAssignment: { flipGrain, switcheroo } } = color
	const { ginghamMode, ginghamChevronContinuum } = stripeCount

	if (!colors) {
		const entry = supertileEntry({ origin, supertile: calculateSupertile() })
		colors = typeof entry === 'string' ? convertTileTypeToColors({ tileType: entry }) : entry.slice()
	}

	colors = flipGrain ? colors.reverse() : colors
	colors = ginghamMode ? mixColors({ colors }) : colors
	colors = switcheroo ? maybeSwitcherooColors({ colors, origin }) : colors
	colors = ginghamChevronContinuum.on ? maybeRealignColors({ colors, origin }) : colors

	if (opacity < 1) colors = fadeColors({ colors })

	return colors
}

const supertileEntry = ({ supertile, origin }) => {
	const { supertileOffset } = state.shared.color.colorAssignment
	const supertileWidth = supertile.length
	const supertileHeight = supertile[ 0 ].length
	let x = origin[ 0 ] + supertileOffset[ 0 ]
	let y = origin[ 1 ] + supertileOffset[ 1 ]
	while (x < 0) x += supertileWidth
	while (y < 0) y += supertileHeight
	return supertile[ x % supertileWidth ][ y % supertileHeight ]
}

const calculateSupertile = () => state.shared.color.gongramColors ? GONGRAM_SUPERTILE : STANDARD_SUPERTILE

const mixColors = ({ colors }) => {
	let mixedColor = {}

	const firstR = colors[ 0 ].r || 0
	const firstG = colors[ 0 ].g || 0
	const firstB = colors[ 0 ].b || 0
	const secondR = colors[ 1 ].r || 0
	const secondG = colors[ 1 ].g || 0
	const secondB = colors[ 1 ].b || 0

	mixedColor.r = Math.floor((firstR + secondR) / 2)
	mixedColor.g = Math.floor((firstG + secondG) / 2)
	mixedColor.b = Math.floor((firstB + secondB) / 2)
	mixedColor.a = (colors[ 0 ].a + colors[ 1 ].a) / 2

	return [ mixedColor, mixedColor ]
}

const fadeColors = ({ colors }) => {
	const { opacity } = state.shared.color
	let newColors = [ Object.assign({}, colors[ 0 ]), Object.assign({}, colors[ 1 ]) ]
	newColors[ 0 ].a = colors[ 0 ].a * opacity
	newColors[ 1 ].a = colors[ 1 ].a * opacity
	return newColors
}

const maybeSwitcherooColors = ({ colors, origin }) => {
	const xMod = origin[ 0 ] % 4
	const yMod = origin[ 1 ] % 4
	if (
		(xMod === 1 && yMod === 1) ||
		(xMod === 3 && yMod === 3) ||
		(xMod === 2 && yMod === 0) ||
		(xMod === 0 && yMod === 2)
	) {
		return colors.reverse()
	}

	return colors
}

const colorsAreTheSame = ({ colors }) => {
	const colorOne = colors[ 0 ]
	const colorTwo = colors[ 1 ]
	return colorOne.a === colorTwo.a && colorsAreTheSameHue({ colorOne, colorTwo })
}

const colorsAreTheSameHue = ({ colorOne, colorTwo }) => {
	if (colorOne.r !== colorTwo.r) return false
	if (colorOne.g !== colorTwo.g) return false
	if (colorOne.b !== colorTwo.b) return false
	return true
}

export default {
	calculateColor,
	convertTileTypeToColors,
	calculateColors,
	fadeColors,
	colorsAreTheSame,
	colorsAreTheSameHue
}