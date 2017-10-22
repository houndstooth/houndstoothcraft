import { ANIMATION_RATE } from '../constants'
import { state } from '../state'
import * as from from '../utilities/from'

const standardAnimation: (p: number) => number = p =>
	p * Math.pow(ANIMATION_RATE, from.Frame(state.currentAnimationFrame))

export { standardAnimation }
