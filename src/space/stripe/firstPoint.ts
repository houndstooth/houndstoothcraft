import { PointsParams } from '../types'
import { pointAlongRightEdge, pointAlongTopEdge } from './stripePoints'

const firstPoint: (_: PointsParams) => void =
	({ outline, stripeStartsInTopLeftHalf, stripeStart, tileOrigin, tileSize }: PointsParams): void => {
		if (stripeStartsInTopLeftHalf) {
			outline.push(pointAlongTopEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
		}
		else {
			outline.push(pointAlongRightEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
		}
	}

export { firstPoint }
