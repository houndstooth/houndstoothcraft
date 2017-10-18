import { StripePosition } from '../../components'
import { OriginAndSize } from './OriginAndSize'
import { Outline } from './Outline'

type Points = (_: {
	originAndSize: OriginAndSize,
	outline: Outline,
	stripeEnd?: StripePosition,
	stripeEndsInBottomRightHalf?: boolean,
	stripeStart?: StripePosition,
	stripeStartsInTopLeftHalf?: boolean,
}) => void

export { Points }
