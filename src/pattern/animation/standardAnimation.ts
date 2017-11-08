import * as constants from '../../constants'
import * as from from '../../from'
import { state } from '../../state'

const standardAnimation: (p: number) => number =
	(p: number): number => p * Math.pow(constants.ANIMATION_RATE, from.Frame(state.currentFrame))

export { standardAnimation }
