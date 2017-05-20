import { SQUARE_TYPE_TO_COLORS_MAPPING } from '../constants'
import supertileEntry from './supertileEntry'
import calculateSupertile from './calculateSupertile'
import mixColors from './mixColors'
import maybeSwitcherooColors from './maybeSwitcherooColors'
import state from '../../state'

export default ({ origin, colors }) => {
    const { flipGrain, ginghamMode, switcheroo } = state.shared
    
	if (!colors) {
		const entry = supertileEntry({ origin, supertile: calculateSupertile() })
		colors = typeof entry === 'string' ? SQUARE_TYPE_TO_COLORS_MAPPING[ entry ].slice() : entry.slice()
	}

	colors = flipGrain ? colors.reverse() : colors
    colors = ginghamMode ? mixColors({ colors }) : colors
    colors = switcheroo ? maybeSwitcherooColors({ colors, origin }) : colors

	return colors
}