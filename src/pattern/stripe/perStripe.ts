import * as constants from '../../constants'
import { codeUtilities, from, to } from '../../utilities'
import { get } from '../patternState'
import { GetStripePosition, StripePosition } from './types'

const perStripe: (_: { getStripePosition: GetStripePosition }) => StripePosition[] =
	({ getStripePosition }: { getStripePosition: GetStripePosition }): StripePosition[] => {
		const stripeCount: number = get('stripeCount')

		return to.StripePositions(codeUtilities.iterator(stripeCount).map((stripeIndex: number): StripePosition =>
			to.StripePosition(from.StripePosition(getStripePosition({
				stripeCount,
				stripeIndex,
			})) * from.StripePosition(constants.PERIMETER_SCALAR))))
	}

export default perStripe
