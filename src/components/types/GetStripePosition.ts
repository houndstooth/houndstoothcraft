import StripePosition from './StripePosition'

type GetStripePosition = { ({}: { stripeCount: number, stripeIndex: number }): StripePosition }

export default GetStripePosition
