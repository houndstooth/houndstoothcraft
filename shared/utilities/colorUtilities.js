import { TILE_TYPE_TO_COLORS_MAPPING } from '../application/constants'
import state from '../state/state'

const calculateColor = ({ colors, stripeIndex, substripeIndex }) => {
	stripeIndex = stripeIndex || 0
	substripeIndex = substripeIndex || 0
	const index = ( stripeIndex + substripeIndex ) % 2
	return colors[ index ]
}

const convertTileTypeToColors = ({ tileType }) => {
	const colorKeys = TILE_TYPE_TO_COLORS_MAPPING[ tileType ].slice()
	const answer = [
		state.shared.colors[ colorKeys[ 0 ] ],
		state.shared.colors[ colorKeys[ 1 ] ]
	]
	console.log(answer)
	return answer
}

export default {
	calculateColor,
	convertTileTypeToColors
}