import { STANDARD_SUPERTILE, SWITCHEROO_SUPERTILE } from '../common/constants'
import { GONGRAM_SUPERTILE } from '../../gongram/common/constants'
import { SWITCHEROO, GONGRAM } from '../common/customize'

export default () => {
	if (SWITCHEROO) {
		return SWITCHEROO_SUPERTILE
	}

	if (GONGRAM) {
		return GONGRAM_SUPERTILE
	}

	return STANDARD_SUPERTILE
}