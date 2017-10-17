import { StripePosition } from '../../components'
import Coordinate from './Coordinate'
import OriginAndSize from './OriginAndSize'

type Point = {
	({}: {
		originAndSize: OriginAndSize,
		stripePosition?: StripePosition,
	}): Coordinate,
}

export default Point
