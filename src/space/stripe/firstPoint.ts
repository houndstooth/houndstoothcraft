import { Points } from '../types/Points'
import { pointAlongRightEdge, pointAlongTopEdge } from './stripePoints'

const firstPoint: Points = ({ outline, stripeStartsInTopLeftHalf, stripeStart, tileOrigin, tileSize }) => {
	if (stripeStartsInTopLeftHalf) {
		outline.push(pointAlongTopEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
	}
	else {
		outline.push(pointAlongRightEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
	}
}

export { firstPoint }
