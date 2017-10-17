import StripePosition from './StripePosition'

interface GetStripePosition { ({}: { stripeCount: number, stripeIndex: number }): StripePosition }

export default GetStripePosition
