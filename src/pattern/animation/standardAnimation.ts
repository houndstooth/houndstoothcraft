import { state } from '../../app'
import * as constants from '../../constants'
import * as from from '../../from'

const standardAnimation: () => number =
	(): number => Math.pow(constants.ANIMATION_RATE, from.Frame(state.controls.currentFrame))

export default standardAnimation
