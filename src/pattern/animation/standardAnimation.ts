import { getCurrentFrame } from '../../app'
import { from } from '../../utilities'

const ANIMATION_RATE: number = 1.001

const standardAnimation: () => number =
	(): number => Math.pow(ANIMATION_RATE, from.Frame(getCurrentFrame.default()))

export default standardAnimation
