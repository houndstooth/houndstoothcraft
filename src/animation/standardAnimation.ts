import { ANIMATION_RATE } from '../constants'
import { state } from '../state'

const standardAnimation: (p: number) => number = p => p * Math.pow(ANIMATION_RATE, state.currentAnimationFrame)

export { standardAnimation }
