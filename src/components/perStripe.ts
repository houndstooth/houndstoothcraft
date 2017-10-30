import { PERIMETER_SCALAR } from '../constants'
import { getFromBaseOrDefaultPattern } from '../store'
import { iterator } from '../utilities/codeUtilities'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { GetStripePosition, StripePosition } from './types'

const perStripe: (_: { getStripePosition: GetStripePosition }) => StripePosition[] =
	({ getStripePosition }: { getStripePosition: GetStripePosition }): StripePosition[] => {
		const stripeCount: number = getFromBaseOrDefaultPattern('stripeCount')

		return to.StripePositions(iterator(stripeCount).map((stripeIndex: number): StripePosition =>
			to.StripePosition(from.StripePosition(getStripePosition({
				stripeCount,
				stripeIndex,
			})) * from.StripePosition(PERIMETER_SCALAR))))
	}

export { perStripe }
