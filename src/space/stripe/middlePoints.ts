import { PERIMETER_SCALAR } from '../../constants'
import * as from from '../../utilities/from'
import * as to from '../../utilities/to'
import { Points } from '../types/Points'
import * as stripePoints from './stripePoints'

const middlePoints: Points = params => {
	const { outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeEnd } = params
	if (!stripeEndsInBottomRightHalf) {
		middlePointsWhenStripeEndsInBottomRightHalf({ outline, originAndSize, stripeEnd })
	}
	else {
		middlePointsWhenStripeDoesNotEndInBottomRightHalf({
			originAndSize,
			outline,
			stripeEnd,
			stripeStartsInTopLeftHalf,
		})
	}
}

const middlePointsWhenStripeEndsInBottomRightHalf: Points = ({ outline, originAndSize, stripeEnd }) => {
	outline.push(stripePoints.pointAlongTopEdge({ originAndSize, stripePosition: stripeEnd }))
	outline.push(stripePoints.pointAlongLeftEdge({ originAndSize, stripePosition: stripeEnd }))
}

const middlePointsWhenStripeDoesNotEndInBottomRightHalf: Points = params => {
	const { stripeStartsInTopLeftHalf, outline, originAndSize, stripeEnd } = params

	if (stripeStartsInTopLeftHalf) {
		outline.push(stripePoints.pointInTopRightCorner({ originAndSize }))
	}

	const stripeEndsInBottomRightCorner = from.StripePosition(stripeEnd || to.StripePosition(0)) === PERIMETER_SCALAR
	if (stripeEndsInBottomRightCorner) {
		outline.push(stripePoints.pointInBottomRightCorner({ originAndSize }))
	}
	else {
		outline.push(stripePoints.pointAlongRightEdge({ originAndSize, stripePosition: stripeEnd }))
		outline.push(stripePoints.pointAlongBottomEdge({ originAndSize, stripePosition: stripeEnd }))
	}
}

export { middlePoints }
