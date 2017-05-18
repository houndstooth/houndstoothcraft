import scalePoint from './scalePoint'
import { SQUARE_SIZE } from '../common/customize'

export default ({ x, y, initialCenter: center, scaleFromGridCenter, sizedUnit }) => {
	let origin
	if (x !== undefined && y !== undefined) {
		origin = [ x * SQUARE_SIZE, y * SQUARE_SIZE ]
		origin = scalePoint({ point: origin, scaleFromGridCenter })
		center = [
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit / 2
		]
	} else if (center) {
		center = scalePoint({ point: center, scaleFromGridCenter })
		origin = [
			center[ 0 ] - sizedUnit / 2,
			center[ 1 ] - sizedUnit / 2
		]
	} else {
		console.log('neither origin nor center provided!')
	}

	return { origin, center }
}