import iterator from '../utilities/iterator'
import state from '../application/state'

export default ({ tile }) => {
    const gridSize = state.shared.gridSize
	iterator(gridSize).forEach(x => {
		iterator(gridSize).forEach(y => {
			tile({ origin: [ x, y ] })
		})
	})
}