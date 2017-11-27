import * as from from '../../../from'
import * as to from '../../../to'
import { pointAlongBottomEdge, pointAlongLeftEdge, pointInBottomLeftCorner } from './stripePoints'
import { PointsParamsPlusStripeStart } from './types'

const lastPoints: (_: PointsParamsPlusStripeStart) => void =
	(params: PointsParamsPlusStripeStart): void => {
		const {
			outline,
			stripeEndsInBottomRightHalf,
			stripeStart,
			stripeStartsInTopLeftHalf,
			tileOrigin,
			tileSize,
		}: PointsParamsPlusStripeStart = params

		const stripeStartsInTopLeftCorner: boolean = from.StripePosition(stripeStart || to.StripePosition(0)) === 0
		if (!stripeStartsInTopLeftCorner) {
			lastPointsWhenStripeDoesNotStartInTopLeftCorner({
				outline,
				stripeEndsInBottomRightHalf,
				stripeStart,
				stripeStartsInTopLeftHalf,
				tileOrigin,
				tileSize,
			})
		}
		else if (stripeEndsInBottomRightHalf) {
			outline.push(pointInBottomLeftCorner({ tileOrigin, tileSize }))
		}
	}

const lastPointsWhenStripeDoesNotStartInTopLeftCorner: (_: PointsParamsPlusStripeStart) => void =
	(params: PointsParamsPlusStripeStart): void => {
		const {
			outline,
			stripeEndsInBottomRightHalf,
			stripeStart,
			stripeStartsInTopLeftHalf,
			tileOrigin,
			tileSize,
		}: PointsParamsPlusStripeStart = params

		if (stripeStartsInTopLeftHalf && stripeEndsInBottomRightHalf) {
			outline.push(pointInBottomLeftCorner({ tileOrigin, tileSize }))
		}

		if (stripeStartsInTopLeftHalf) {

			outline.push(pointAlongLeftEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
		}
		else {
			outline.push(pointAlongBottomEdge({ stripePosition: stripeStart, tileOrigin, tileSize }))
		}
	}

export default lastPoints
