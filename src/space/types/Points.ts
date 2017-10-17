import { StripePosition } from '../../components'
import Outline from './Outline'
import OriginAndSize from './OriginAndSize'

type Points = {
	({}: {
		originAndSize: OriginAndSize,
		outline: Outline,
		stripeEnd?: StripePosition,
		stripeEndsInBottomRightHalf?: boolean,
		stripeStart?: StripePosition
		stripeStartsInTopLeftHalf?: boolean,
	}): void,
}

export default Points
