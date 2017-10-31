import * as from from '../utilities/from'
import { firstPoint } from './stripe/firstPoint'
import { lastPoints } from './stripe/lastPoints'
import { middlePoints } from './stripe/middlePoints'
import { GetStripeOutline, GetStripeOutlineParams, Outline, OutlineOptions } from './types'

const stripeOutline: GetStripeOutline =
	({ tileOrigin, tileSize, outlineOptions }: GetStripeOutlineParams): Outline => {
		const { stripeStart, stripeEnd }: OutlineOptions = outlineOptions

		const stripeStartsInTopLeftHalf: boolean = from.StripePosition(stripeStart) < 1
		const stripeEndsInBottomRightHalf: boolean = from.StripePosition(stripeEnd) > 1

		const outline: Outline = []
		firstPoint({ outline, stripeStartsInTopLeftHalf, stripeStart, tileOrigin, tileSize })
		middlePoints({
			outline,
			stripeEnd,
			stripeEndsInBottomRightHalf,
			stripeStartsInTopLeftHalf,
			tileOrigin,
			tileSize,
		})
		lastPoints({
			outline,
			stripeEndsInBottomRightHalf,
			stripeStart,
			stripeStartsInTopLeftHalf,
			tileOrigin,
			tileSize,
		})

		return outline
	}

export { stripeOutline }
