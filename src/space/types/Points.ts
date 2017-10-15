import { StripePosition } from '../../components'
import Outline from './Outline'
import OriginAndSize from './OriginAndSize'

type Points = {
	({}: {
		outline: Outline,
		originAndSize: OriginAndSize,
		stripeStartsInTopLeftHalf?: boolean,
		stripeEndsInBottomRightHalf?: boolean,
		stripeStart?: StripePosition
		stripeEnd?: StripePosition,
	}): void,
}

export default Points
