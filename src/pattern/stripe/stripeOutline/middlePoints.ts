import { from } from '../../../utilities'
import { PERIMETER_SCALAR } from '../../constants'

import * as stripePoints from './stripePoints'
import { PointsParamsPlusStripeEnd } from './types'

const middlePoints: (_: PointsParamsPlusStripeEnd) => void =
	(pointsParamsPlusStripeEnd: PointsParamsPlusStripeEnd): void => {
		const {
			outline,
			stripeStartsInTopLeftHalf,
			stripeEndsInBottomRightHalf,
			stripeEnd,
			tileOrigin,
			tileSize,
		}: PointsParamsPlusStripeEnd = pointsParamsPlusStripeEnd

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

const middlePointsWhenStripeEndsInBottomRightHalf: (_: PointsParamsPlusStripeEnd) => void =
	({ outline, stripeEnd, tileOrigin, tileSize }: PointsParamsPlusStripeEnd): void => {
		outline.push(stripePoints.pointAlongTopEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
		outline.push(stripePoints.pointAlongLeftEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
	}

const middlePointsWhenStripeDoesNotEndInBottomRightHalf: (_: PointsParamsPlusStripeEnd) => void =
	({ stripeStartsInTopLeftHalf, outline, stripeEnd, tileOrigin, tileSize }: PointsParamsPlusStripeEnd): void => {
		if (stripeStartsInTopLeftHalf) {
			outline.push(stripePoints.pointInTopRightCorner({ tileOrigin, tileSize }))
		}

		// tslint:disable-next-line:max-line-length
		const stripeEndsInBottomRightCorner: boolean = from.StripePosition(stripeEnd) === from.StripePosition(PERIMETER_SCALAR)
		if (stripeEndsInBottomRightCorner) {
			outline.push(stripePoints.pointInBottomRightCorner({ tileOrigin, tileSize }))
		}
		else {
			outline.push(stripePoints.pointAlongRightEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
			outline.push(stripePoints.pointAlongBottomEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
		}
	}

export default middlePoints
