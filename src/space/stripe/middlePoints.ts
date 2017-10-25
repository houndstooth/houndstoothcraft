import { PERIMETER_SCALAR } from '../../constants'
import * as from from '../../utilities/from'
import * as to from '../../utilities/to'
import { PointsParams } from '../types/PointsParams'
import * as stripePoints from './stripePoints'

const middlePoints: (_: PointsParams) => void = params => {
	const { outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, stripeEnd, tileOrigin, tileSize } = params
	if (!stripeEndsInBottomRightHalf) {
		middlePointsWhenStripeEndsInBottomRightHalf({ outline, stripeEnd, tileOrigin, tileSize })
	}
	else {
		middlePointsWhenStripeDoesNotEndInBottomRightHalf({
			outline,
			stripeEnd,
			stripeStartsInTopLeftHalf,
			tileOrigin,
			tileSize,
		})
	}
}

const middlePointsWhenStripeEndsInBottomRightHalf: (_: PointsParams) => void = params => {
	const { outline, stripeEnd, tileOrigin, tileSize } = params
	outline.push(stripePoints.pointAlongTopEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
	outline.push(stripePoints.pointAlongLeftEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
}

const middlePointsWhenStripeDoesNotEndInBottomRightHalf: (_: PointsParams) => void = params => {
	const { stripeStartsInTopLeftHalf, outline, stripeEnd, tileOrigin, tileSize } = params

	if (stripeStartsInTopLeftHalf) {
		outline.push(stripePoints.pointInTopRightCorner({ tileOrigin, tileSize }))
	}

	const stripeEndsInBottomRightCorner = from.StripePosition(stripeEnd || to.StripePosition(0)) === PERIMETER_SCALAR
	if (stripeEndsInBottomRightCorner) {
		outline.push(stripePoints.pointInBottomRightCorner({ tileOrigin, tileSize }))
	}
	else {
		outline.push(stripePoints.pointAlongRightEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
		outline.push(stripePoints.pointAlongBottomEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
	}
}

export { middlePoints }
