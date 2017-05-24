import iterator from '../utilities/iterator'
import state from '../state/state'

export default ({ tile }) => {
	const { gridSize, negativeGridToo } = state.shared

	if (negativeGridToo) {
		iterator(gridSize * 2).forEach(x => {
			iterator(gridSize * 2).forEach(y => {
				tile({ origin: [ x - gridSize, y - gridSize ] })
			})
		})
	} else {
		iterator(gridSize).forEach(x => {
			iterator(gridSize).forEach(y => {
				tile({ origin: [ x, y ] })
			})
		})
	}
}
