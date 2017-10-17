import { StripePosition, StripeCountMode, BaseStripeDiagonal } from '../../../components'

type StripeSettings = {
	baseStripeDiagonal?: BaseStripeDiagonal,
	stripePositionSettings?: {
		stripeCountContinuumSettings?: {
			deltaStripeCount?: number,
			initialStripeCount?: number,
		},
		stripeCountMode?: StripeCountMode,
		stripeCountSetting?: number,
		getStripePositions?(p?: any): StripePosition[],
	},
}

export default StripeSettings
