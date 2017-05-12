import { UNIT } from '../common/customize'
import { CENTER } from '../common/constants'

export default ({origin, scaleFromCenter}) => {
	if (scaleFromCenter) {
		origin[0] -= CENTER[0]
		origin[1] -= CENTER[1]
	}

	origin[ 0 ] *= UNIT
	origin[ 1 ] *= UNIT

	if (scaleFromCenter) {
		origin[0] += CENTER[0]
		origin[1] += CENTER[1]
	}

	return origin
}