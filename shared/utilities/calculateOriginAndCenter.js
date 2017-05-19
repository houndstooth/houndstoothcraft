import scalePoint from './scalePoint'
import { SQUARE_SIZE } from '../common/customize'

export default ({ initialOrigin: origin, initialCenter: center, scaleFromGridCenter, sizedUnit }) => {
	if (origin) {
		origin = [ origin[ 0 ] * SQUARE_SIZE, origin[ 1 ] * SQUARE_SIZE ]
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