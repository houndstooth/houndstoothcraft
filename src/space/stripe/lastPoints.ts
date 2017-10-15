import { Points } from '../types'
import { pointAlongBottomEdge, pointAlongLeftEdge, pointInBottomLeftCorner } from './stripePoints'

const lastPoints: Points = params => {
	const { outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeStart } = params
	const stripeStartsInTopLeftCorner = stripeStart as any === 0
	if (!stripeStartsInTopLeftCorner) {
		lastPointsWhenStripeDoesNotStartInTopLeftCorner({
			stripeStartsInTopLeftHalf,
			stripeEndsInBottomRightHalf,
			outline,
			originAndSize,
			stripeStart,
		})
	}
	else if (stripeEndsInBottomRightHalf) {
		outline.push(pointInBottomLeftCorner({ originAndSize }))
	}
}

const lastPointsWhenStripeDoesNotStartInTopLeftCorner: Points = params => {
	const { stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, outline, originAndSize, stripeStart } = params

	if (stripeStartsInTopLeftHalf && stripeEndsInBottomRightHalf) {
		outline.push(pointInBottomLeftCorner({ originAndSize }))
	}

	if (stripeStartsInTopLeftHalf) {

		outline.push(pointAlongLeftEdge({ originAndSize, stripePosition: stripeStart }))
	}
	else {
		outline.push(pointAlongBottomEdge({ originAndSize, stripePosition: stripeStart }))
	}
}

export default lastPoints
