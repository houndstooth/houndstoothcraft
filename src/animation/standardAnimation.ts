import { ANIMATION_RATE } from '../constants'
import { state } from '../state'
import * as from from '../utilities/from'

const standardAnimation: (p: number) => number =
	(p: number): number => p * Math.pow(ANIMATION_RATE, from.Frame(state.currentFrame))

export { standardAnimation }
