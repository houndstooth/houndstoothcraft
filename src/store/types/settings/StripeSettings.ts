import { BaseStripeDiagonal } from '../../../components'
import { StripePositionSettings } from './stripe'

interface StripeSettings {
	baseStripeDiagonal: BaseStripeDiagonal,
	stripePositionSettings: Partial<StripePositionSettings>,
}

export { StripeSettings }
