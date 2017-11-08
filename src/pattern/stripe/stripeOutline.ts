import * as from from '../../from'
import { firstPoint } from './firstPoint'
import { lastPoints } from './lastPoints'
import { middlePoints } from './middlePoints'
import { GetOutlineParams, GetStripeOutline, Outline, OutlineOptions } from './types'

const stripeOutline: GetStripeOutline =
	({ tileOrigin, tileSize, outlineOptions }: GetOutlineParams): Outline => {
		const outline: Outline = []

		if (!outlineOptions) {
			return outline
		}

		const { stripeStart, stripeEnd }: OutlineOptions = outlineOptions

		const stripeStartsInTopLeftHalf: boolean = from.StripePosition(stripeStart) < 1
		const stripeEndsInBottomRightHalf: boolean = from.StripePosition(stripeEnd) > 1

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
