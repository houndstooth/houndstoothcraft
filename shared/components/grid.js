import iterator from '../utilities/iterator'
import state from '../state/state'

export default ({ tile }) => {
	const { gridSize, negativeGridToo } = state

	if (negativeGridToo) {
		iterator(gridSize * 2).forEach(x => {
			iterator(gridSize * 2).forEach(y => {
				tile({ address: [ x - gridSize, y - gridSize ] })
			})
		})
	} else {
		iterator(gridSize).forEach(x => {
			iterator(gridSize).forEach(y => {
				tile({ address: [ x, y ] })
			})
		})
	}
}
