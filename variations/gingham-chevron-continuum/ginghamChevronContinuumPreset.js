import { ANIMATION_RATE } from '../../shared/application/constants'

export default {
	state: {
		stripeCountConfig: {
			mode: 'GINGHAM_CHEVRON_CONTINUUM',
			ginghamChevronContinuum: {
				delta: 1,
				initial: 1
			}
		}
	},
	animations: {
		stripeCountConfig: {
			ginghamChevronContinuum: {
				initial: p => p * ANIMATION_RATE,
				delta: p => p * ANIMATION_RATE
			}
		}
	}
}