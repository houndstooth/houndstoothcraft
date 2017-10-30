import { PERIMETER_SCALAR } from '../../constants'
import * as from from '../../utilities/from'
import * as to from '../../utilities/to'
import { PointsParams } from '../types'
import * as stripePoints from './stripePoints'

const middlePoints: (_: PointsParams) => void =
	(params: PointsParams): void => {
		const {
			outline,
			stripeStartsInTopLeftHalf,
			stripeEndsInBottomRightHalf,
			stripeEnd,
			tileOrigin,
			tileSize,
		}: PointsParams = params

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

const middlePointsWhenStripeEndsInBottomRightHalf: (_: PointsParams) => void =
	({ outline, stripeEnd, tileOrigin, tileSize }: PointsParams): void => {
		outline.push(stripePoints.pointAlongTopEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
		outline.push(stripePoints.pointAlongLeftEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
	}

const middlePointsWhenStripeDoesNotEndInBottomRightHalf: (_: PointsParams) => void =
	({ stripeStartsInTopLeftHalf, outline, stripeEnd, tileOrigin, tileSize }: PointsParams): void => {
		if (stripeStartsInTopLeftHalf) {
			outline.push(stripePoints.pointInTopRightCorner({ tileOrigin, tileSize }))
		}

		// tslint:disable-next-line:max-line-length
		const stripeEndsInBottomRightCorner: boolean = from.StripePosition(stripeEnd || to.StripePosition(0)) === from.StripePosition(PERIMETER_SCALAR)
		if (stripeEndsInBottomRightCorner) {
			outline.push(stripePoints.pointInBottomRightCorner({ tileOrigin, tileSize }))
		}
		else {
			outline.push(stripePoints.pointAlongRightEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
			outline.push(stripePoints.pointAlongBottomEdge({ stripePosition: stripeEnd, tileOrigin, tileSize }))
		}
	}

export { middlePoints }
