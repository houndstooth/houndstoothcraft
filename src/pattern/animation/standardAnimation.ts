import { appState } from '../../app'
import { ANIMATION_RATE } from '../../constants'
import { from } from '../../utilities'

const standardAnimation: () => number =
	(): number => Math.pow(ANIMATION_RATE, from.Frame(appState.controls.currentFrame))

export default standardAnimation
