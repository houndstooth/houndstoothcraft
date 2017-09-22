import state from '../../state'
import { ANIMATION_RATE } from '../constants'

const standardAnimation = p => p * Math.pow(ANIMATION_RATE, state.currentAnimationFrame)

export default standardAnimation
