import { SQUARE_TYPE_TO_COLORS_MAPPING } from '../common/constants'
import supertileEntry from './supertileEntry'
import calculateSupertile from './calculateSupertile'
import maybeMixColors from '../utilities/maybeMixColors'
import { FLIP_GRAIN } from '../common/customize'

export default ({ origin, colors }) => {
	if (!colors) {
		const entry = supertileEntry({ origin, supertile: calculateSupertile() })
		colors = typeof entry === 'string' ? SQUARE_TYPE_TO_COLORS_MAPPING[ entry ] : entry
	}

	colors = FLIP_GRAIN ? colors.reverse() : colors
	colors = maybeMixColors({ colors })

	return colors
}