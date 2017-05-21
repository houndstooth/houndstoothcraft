import { SQUARE_TYPE_TO_COLORS_MAPPING } from '../constants'
import supertileEntry from './supertileEntry'
import calculateSupertile from './calculateSupertile'
import mixColors from './mixColors'
import maybeSwitcherooColors from './maybeSwitcherooColors'
import state from '../../state'
import maybeRealignColors from '../../gingham-chevron-continuum-animated/utilities/maybeRealignColors'

export default ({ origin, colors }) => {
    const { flipGrain, ginghamMode, switcheroo, stripeCount } = state.shared
    const { style, on } = stripeCount.ginghamChevronContinuum
    const fluid = on && style === 'FLUID'

	if (!colors) {
		const entry = supertileEntry({ origin, supertile: calculateSupertile() })
		colors = typeof entry === 'string' ? SQUARE_TYPE_TO_COLORS_MAPPING[ entry ].slice() : entry.slice()
	}

	colors = flipGrain ? colors.reverse() : colors
    colors = ginghamMode ? mixColors({ colors }) : colors
    colors = switcheroo ? maybeSwitcherooColors({ colors, origin }) : colors
    colors = fluid ? maybeRealignColors({ colors, origin }) : colors

	return colors
}