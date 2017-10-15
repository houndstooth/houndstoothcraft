import StripePosition from './StripePosition'

type GetStripePosition = { ({}: { stripeIndex: number, stripeCount: number }): StripePosition }

export default GetStripePosition
