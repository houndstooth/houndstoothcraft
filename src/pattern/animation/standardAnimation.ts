import { appState } from '../../app'
import * as constants from '../../constants'
import { from } from '../../utilities'

const standardAnimation: () => number =
	(): number => Math.pow(constants.ANIMATION_RATE, from.Frame(appState.controls.currentFrame))

export default standardAnimation
