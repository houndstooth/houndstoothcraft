import store from '../../store'
import { ANIMATION_RATE } from '../constants'

export default p => p * Math.pow(ANIMATION_RATE, store.currentAnimationFrame)
