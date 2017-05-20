import { CENTER } from '../constants'
import state from '../../state'

export default ({ point, scaleFromGridCenter }) => {
	const unit = state.shared.unit

	if (scaleFromGridCenter) {
		point[ 0 ] -= CENTER[ 0 ]
		point[ 1 ] -= CENTER[ 1 ]
	}

	point[ 0 ] *= unit
	point[ 1 ] *= unit

	if (scaleFromGridCenter) {
		point[ 0 ] += CENTER[ 0 ]
		point[ 1 ] += CENTER[ 1 ]
	}

	return point
}