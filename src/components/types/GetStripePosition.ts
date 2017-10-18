import { StripePosition } from './StripePosition'

type GetStripePosition = (_: { stripeCount: number, stripeIndex: number }) => StripePosition

export { GetStripePosition }
