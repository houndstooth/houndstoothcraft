import { ANIMATION_RATE } from '../constants'
import * as from from '../from'
import { state } from '../state'

const standardAnimation: (p: number) => number = p =>
	p * Math.pow(ANIMATION_RATE, from.Frame(state.currentAnimationFrame))

export { standardAnimation }
