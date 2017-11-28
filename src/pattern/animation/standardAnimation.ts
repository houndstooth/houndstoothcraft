import * as constants from '../../constants'
import * as from from '../../from'
import { state } from '../../state'

const standardAnimation: () => number =
	(): number => Math.pow(constants.ANIMATION_RATE, from.Frame(state.currentFrame))

export default standardAnimation
