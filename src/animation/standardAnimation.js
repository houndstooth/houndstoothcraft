import state from '../../state'
import { ANIMATION_RATE } from '../constants'

export default p => p * Math.pow(ANIMATION_RATE, state.currentAnimationFrame)
