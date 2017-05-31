import state from '../state/state'
import maybeRealignColors from '../../gingham-chevron-continuum/maybeRealignColors'

const calculateColor = ({ colors, stripeIndex, substripeIndex }) => {
	stripeIndex = stripeIndex || 0
	substripeIndex = substripeIndex || 0
	const index = ( stripeIndex + substripeIndex ) % colors.length
	return colors[ index ]
}

const calculateColors = ({ origin, colors }) => {
	const { stripeCount, color } = state.shared
	const { opacity, colors: stateColors, colorAssignment: { flipGrain, switcheroo, mode } } = color
	const { ginghamMode, ginghamChevronContinuum } = stripeCount

	if (!colors) {
		if (mode === 'SUPERTILE') {
			colors = supertileEntry({ origin }).map(index => stateColors[ index ])
		} else if (mode === 'WEAVE') {
			// implement later
		}
	}

	colors = flipGrain ? colors.reverse() : colors
	colors = ginghamMode ? mixColors({ colors }) : colors
	colors = switcheroo ? maybeSwitcherooColors({ colors, origin }) : colors
	colors = ginghamChevronContinuum.on ? maybeRealignColors({ colors, origin }) : colors

	if (opacity < 1) colors = fadeColors({ colors })

	return colors
}

const supertileEntry = ({ origin }) => {
	const { offset, tiles } = state.shared.color.colorAssignment.supertile
	const supertileWidth = tiles.length
	const supertileHeight = tiles[ 0 ].length
	let x = origin[ 0 ] + offset[ 0 ]
	let y = origin[ 1 ] + offset[ 1 ]
	while (x < 0) x += supertileWidth
	while (y < 0) y += supertileHeight
	return tiles[ x % supertileWidth ][ y % supertileHeight ]
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
	return [{
		r: Math.floor(totalColor.r / colorsCount),
		g: Math.floor(totalColor.g / colorsCount),
		b: Math.floor(totalColor.b / colorsCount),
		a: totalColor.a / colorsCount
	}]
}

const fadeColors = ({ colors }) => colors.map(color => Object.assign({}, color, { a: color.a * state.shared.color.opacity }))

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
	calculateColor,
	calculateColors,
	fadeColors,
	allColorsAreTheSame,
	colorsAreTheSameHue
}