import scalePoint from './scalePoint'
import state from '../application/state'

export default ({ initialOrigin: origin, initialCenter: center, scaleFromGridCenter, sizedUnit }) => {
	const tileSize = state.shared.tileSize
	
	if (center) {
		center = scalePoint({ point: center, scaleFromGridCenter })
		origin = [
			center[ 0 ] - sizedUnit / 2,
			center[ 1 ] - sizedUnit / 2
		]
	} else if (origin) {
		origin = [ origin[ 0 ] * tileSize, origin[ 1 ] * tileSize ]
		origin = scalePoint({ point: origin, scaleFromGridCenter })
		center = [
			origin[ 0 ] + sizedUnit / 2,
			origin[ 1 ] + sizedUnit / 2
		]
	} else {
		console.log('neither origin nor center provided!')
	}

	return { origin, center }
}