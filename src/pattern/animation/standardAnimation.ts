import { getCurrentFrame } from '../../app'
import { ANIMATION_RATE } from '../../constants'
import { from } from '../../utilities'

const standardAnimation: () => number =
	(): number => Math.pow(ANIMATION_RATE, from.Frame(getCurrentFrame.default()))

export default standardAnimation
