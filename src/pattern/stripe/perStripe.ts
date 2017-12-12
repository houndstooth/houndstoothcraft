import { codeUtilities, from, to } from '../../utilities'
import { PERIMETER_SCALAR } from '../constants'
import { patternState } from '../patternState'
import { GetStripePosition, StripePosition } from './types'

const perStripe: (_: { getStripePosition: GetStripePosition }) => StripePosition[] =
	({ getStripePosition }: { getStripePosition: GetStripePosition }): StripePosition[] => {
		const stripeCount: number = patternState.stripeSettings.stripePositionSettings.stripeCount

		return to.StripePositions(codeUtilities.iterator(stripeCount).map((stripeIndex: number): StripePosition =>
			to.StripePosition(from.StripePosition(getStripePosition({
				stripeCount,
				stripeIndex,
			})) * from.StripePosition(PERIMETER_SCALAR))))
	}

export default perStripe
