import { SQUARE_TYPE_TO_COLORS_MAPPING } from '../common/constants'
import supertileEntry from './supertileEntry'
import calculateSupertile from './calculateSupertile'

export default ({ x, y }) => {
	const entry = supertileEntry({ x, y, supertile: calculateSupertile() })
	if (typeof entry === 'string') {
		return SQUARE_TYPE_TO_COLORS_MAPPING[ entry ]
	}

	return entry
}