import iterator from '../utilities/iterator'
import { GRID_SIZE } from '../common/customize'

export default ({ tile, options }) => {
	iterator(GRID_SIZE).forEach(x => {
		iterator(GRID_SIZE).forEach(y => {
			tile({ origin: [x, y], options })
		})
	})
}