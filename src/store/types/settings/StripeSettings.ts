import { StripePosition, StripeCountMode, BaseStripeDiagonal } from '../../../components'

type StripeSettings = {
	stripePositionSettings?: {
		stripeCountMode?: StripeCountMode,
		stripeCountSetting?: number,
		stripeCountContinuumSettings?: {
			initialStripeCount?: number,
			deltaStripeCount?: number,
		},
		getStripePositions?(p?: any): StripePosition[],
	},
	baseStripeDiagonal?: BaseStripeDiagonal,
}

export default StripeSettings
