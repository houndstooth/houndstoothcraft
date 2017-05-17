import { UNIT } from '../common/customize'
import { CENTER } from '../common/constants'

export default ({ point, scaleFromGridCenter }) => {
	if (scaleFromGridCenter) {
		point[ 0 ] -= CENTER[ 0 ]
		point[ 1 ] -= CENTER[ 1 ]
	}

	point[ 0 ] *= UNIT
	point[ 1 ] *= UNIT

	if (scaleFromGridCenter) {
		point[ 0 ] += CENTER[ 0 ]
		point[ 1 ] += CENTER[ 1 ]
	}

	return point
}