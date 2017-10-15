import { StripePosition } from '../../../components'

type StripeSettings = {
	stripePositionSettings?: {
		stripeCountMode?: string,
		stripeCountSetting?: number,
		stripeCountContinuumSettings?: {
			initialStripeCount?: number,
			deltaStripeCount?: number,
		},
		getStripePositions?(p?: any): StripePosition[],
	},
	baseStripeDiagonal?: string,
}

export default StripeSettings
