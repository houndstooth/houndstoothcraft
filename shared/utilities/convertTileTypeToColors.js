import { TILE_TYPE_TO_COLORS_MAPPING } from '../application/constants'
import state from '../state/state'

export default ({ tileType }) => {
	const colorKeys = TILE_TYPE_TO_COLORS_MAPPING[ tileType ].slice()
	return [
		state.shared.colors[ colorKeys[ 0 ] ],
		state.shared.colors[ colorKeys[ 1 ] ]
	]
}
