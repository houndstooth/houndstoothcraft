import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { firstPoint } from './stripe/firstPoint'
import { lastPoints } from './stripe/lastPoints'
import { middlePoints } from './stripe/middlePoints'
import { GetStripeOutline, Outline } from './types'

const stripeOutline: GetStripeOutline = ({ tileOrigin, tileSize, outlineOptions }) => {
	const { stripeStart, stripeEnd } = outlineOptions

	const stripeStartsInTopLeftHalf = from.StripePosition(stripeStart || to.StripePosition(0)) < 1
	const stripeEndsInBottomRightHalf = from.StripePosition(stripeEnd || to.StripePosition(0)) > 1

	const outline: Outline = []
	firstPoint({ outline, stripeStartsInTopLeftHalf, stripeStart, tileOrigin, tileSize })
	middlePoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, stripeEnd, tileOrigin, tileSize })
	lastPoints({ outline, stripeStartsInTopLeftHalf, stripeEndsInBottomRightHalf, stripeStart, tileOrigin, tileSize })

	return outline
}

export { stripeOutline }
