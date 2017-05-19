import { SQUARE_TYPE_TO_COLORS_MAPPING } from '../common/constants'
import supertileEntry from './supertileEntry'
import calculateSupertile from './calculateSupertile'
import { FLIP_GRAIN, GINGHAM_MODE, SWITCHEROO } from '../common/customize'
import mixColors from './mixColors'
import maybeSwitcherooColors from './maybeSwitcherooColors'

export default ({ origin, colors }) => {
	if (!colors) {
		const entry = supertileEntry({ origin, supertile: calculateSupertile() })
		colors = typeof entry === 'string' ? SQUARE_TYPE_TO_COLORS_MAPPING[ entry ].slice() : entry.slice()
	}

	colors = FLIP_GRAIN ? colors.reverse() : colors
    colors = GINGHAM_MODE ? mixColors({ colors }) : colors
    colors = SWITCHEROO ? maybeSwitcherooColors({ colors, origin }) : colors

	return colors
}