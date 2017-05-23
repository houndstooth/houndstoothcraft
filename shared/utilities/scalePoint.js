import state from '../application/state'

export default ({ point, scaleFromGridCenter }) => {
	const { unit, canvasSize } = state.shared
	const canvasCenter = [ canvasSize / 2, canvasSize / 2 ]

	if (scaleFromGridCenter) {
		point[ 0 ] -= canvasCenter[ 0 ]
		point[ 1 ] -= canvasCenter[ 1 ]
	}

	point[ 0 ] *= unit
	point[ 1 ] *= unit

	if (scaleFromGridCenter) {
		point[ 0 ] += canvasCenter[ 0 ]
		point[ 1 ] += canvasCenter[ 1 ]
	}

	return point
}