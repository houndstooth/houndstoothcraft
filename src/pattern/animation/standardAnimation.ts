import { state } from '../../app'
import * as constants from '../../constants'
import { from } from '../../utilities'

const standardAnimation: () => number =
	(): number => Math.pow(constants.ANIMATION_RATE, from.Frame(state.controls.currentFrame))

export default standardAnimation
