import { pointAlongRightEdge, pointAlongTopEdge } from './stripePoints'
import { PointsParamsPlusStripeStart } from './types'

const firstPoint: (_: PointsParamsPlusStripeStart) => void =
	({ outline, stripeStartsInTopLeftHalf, stripeStart, tileOrigin, tileSize }: PointsParamsPlusStripeStart): void => {
		if (stripeStartsInTopLeftHalf) {
			outline.push(pointAlongTopEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
		}
		else {
			outline.push(pointAlongRightEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
		}
	}

export { firstPoint as main }
