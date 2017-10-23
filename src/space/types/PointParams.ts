import { StripePosition, TileOriginAndSize } from '../../components'

interface PointParams extends TileOriginAndSize {
	stripePosition?: StripePosition,
}

export { PointParams }
