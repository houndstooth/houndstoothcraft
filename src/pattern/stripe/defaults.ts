import standardStripePositions from './standardStripePositions'
import { StripeCountContinuumSettings } from './stripeCountContinuumSettings'
import { StripePositionSettings } from './stripePositionSettings'
import { StripeSettings } from './stripeSettings'
import { BaseStripeDiagonal, GetStripePositions, StripeCountMode } from './types'

const DEFAULT_DELTA_STRIPE_COUNT: number = 1
const DEFAULT_INITIAL_STRIPE_COUNT: number = 1

const DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS: StripeCountContinuumSettings = {
	deltaStripeCount: DEFAULT_DELTA_STRIPE_COUNT,
	initialStripeCount: DEFAULT_INITIAL_STRIPE_COUNT,
}

const DEFAULT_GET_STRIPE_POSITIONS: GetStripePositions = standardStripePositions
const DEFAULT_STRIPE_COUNT: number = 4
const DEFAULT_STRIPE_COUNT_MODE: StripeCountMode = StripeCountMode.Standard

const DEFAULT_STRIPE_POSITION_SETTINGS: StripePositionSettings = {
	getStripePositions: DEFAULT_GET_STRIPE_POSITIONS,
	stripeCount: DEFAULT_STRIPE_COUNT,
	stripeCountContinuumSettings: DEFAULT_STRIPE_COUNT_CONTINUUM_SETTINGS,
	stripeCountMode: DEFAULT_STRIPE_COUNT_MODE,
}

const DEFAULT_BASE_STRIPE_DIAGONAL: BaseStripeDiagonal = BaseStripeDiagonal.Minor

const DEFAULT_STRIPE_SETTINGS: StripeSettings = {
	baseStripeDiagonal: DEFAULT_BASE_STRIPE_DIAGONAL,
	stripePositionSettings: DEFAULT_STRIPE_POSITION_SETTINGS,
}

export {
	DEFAULT_STRIPE_SETTINGS,
}
