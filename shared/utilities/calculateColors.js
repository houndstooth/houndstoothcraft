import convertSquareTypeToColors from './convertSquareTypeToColors'
import supertileEntry from './supertileEntry'
import calculateSupertile from './calculateSupertile'
import mixColors from './mixColors'
import maybeSwitcherooColors from './maybeSwitcherooColors'
import state from '../application/state'
import maybeRealignColors from '../../gingham-chevron-continuum-animated/utilities/maybeRealignColors'

export default ({ origin, colors }) => {
	const { flipGrain, ginghamMode, switcheroo, stripeCount, opacity } = state.shared
	const { style, on } = stripeCount.ginghamChevronContinuum
	const fluid = on && style === 'FLUID'

	if (!colors) {
		const entry = supertileEntry({ origin, supertile: calculateSupertile() })
		colors = typeof entry === 'string' ? convertSquareTypeToColors({ squareType: entry }) : entry.slice()
	}

	colors = flipGrain ? colors.reverse() : colors
	colors = ginghamMode ? mixColors({ colors }) : colors
	colors = switcheroo ? maybeSwitcherooColors({ colors, origin }) : colors
	colors = fluid ? maybeRealignColors({ colors, origin }) : colors

	if (opacity < 1) {
		let newColors = [ Object.assign({}, colors[ 0 ]), Object.assign({}, colors[ 1 ]) ]
		newColors[ 0 ].a = colors[ 0 ].a * opacity
		newColors[ 1 ].a = colors[ 1 ].a * opacity
		colors = newColors
	}

	return colors
}