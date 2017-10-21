import * as from from '../from'
import * as to from '../to'
import { firstPoint } from './stripe/firstPoint'
import { lastPoints } from './stripe/lastPoints'
import { middlePoints } from './stripe/middlePoints'
import { GetStripeOutline } from './types'

const stripeOutline: GetStripeOutline = ({ tileOrigin, tileSize, outlineOptions }) => {
	const { stripeStart, stripeEnd } = outlineOptions
	const originAndSize = { x: tileOrigin[ 0 ], y: tileOrigin[ 1 ], size: tileSize }

	const stripeStartsInTopLeftHalf = from.StripePosition(stripeStart || to.StripePosition(0)) < 1
	const stripeEndsInBottomRightHalf = from.StripePosition(stripeEnd || to.StripePosition(0)) > 1

	const outline = []
	firstPoint({ outline, stripeStartsInTopLeftHalf, originAndSize, stripeStart })
	middlePoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeEnd })
	lastPoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, originAndSize, stripeStart })

	return outline
}

export { stripeOutline }
