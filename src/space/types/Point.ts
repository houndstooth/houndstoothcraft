import { StripePosition } from '../../components'
import OriginAndSize from './OriginAndSize'
import Coordinate from './Coordinate'

type Point = {
	({}: {
		originAndSize: OriginAndSize,
		stripePosition?: StripePosition,
	}): Coordinate,
}

export default Point
