import { SQUARE_TYPE_TO_COLORS_MAPPING } from '../application/constants'
import state from '../state/state'

export default ({ squareType }) => {
	const colorKeys = SQUARE_TYPE_TO_COLORS_MAPPING[ squareType ].slice()
	return [
		state.shared.colors[ colorKeys[ 0 ] ],
		state.shared.colors[ colorKeys[ 1 ] ]
	]
}
