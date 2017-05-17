import { STANDARD_SUPERTILE, SWITCHEROO_SUPERTILE, SQUARE_TYPE_TO_COLORS_MAPPING } from '../common/constants'
import { SWITCHEROO } from '../common/customize'
import supertileEntry from './supertileEntry'

export default ({ x, y }) => {
	return SQUARE_TYPE_TO_COLORS_MAPPING[
		supertileEntry({ x, y, supertile: SWITCHEROO ? SWITCHEROO_SUPERTILE : STANDARD_SUPERTILE })
	]
}