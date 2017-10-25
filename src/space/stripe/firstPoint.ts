import { PointsParams } from '../types/PointsParams'
import { pointAlongRightEdge, pointAlongTopEdge } from './stripePoints'

const firstPoint: (_: PointsParams) => void = params => {
	const { outline, stripeStartsInTopLeftHalf, stripeStart, tileOrigin, tileSize } = params
	if (stripeStartsInTopLeftHalf) {
		outline.push(pointAlongTopEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
	}
	else {
		outline.push(pointAlongRightEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
	}
}

export { firstPoint }
