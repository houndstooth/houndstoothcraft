import * as from from '../../from'
import * as to from '../../to'
import { Points } from '../types'
import { pointAlongBottomEdge, pointAlongLeftEdge, pointInBottomLeftCorner } from './stripePoints'

const lastPoints: Points = params => {
	const { outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeStart } = params
	const stripeStartsInTopLeftCorner = from.StripePosition(stripeStart || to.StripePosition(0)) === 0
	if (!stripeStartsInTopLeftCorner) {
		lastPointsWhenStripeDoesNotStartInTopLeftCorner({
			originAndSize,
			outline,
			stripeEndsInBottomRightHalf,
			stripeStart,
			stripeStartsInTopLeftHalf,
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

export { lastPoints }
