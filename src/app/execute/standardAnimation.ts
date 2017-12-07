import { ANIMATION_RATE } from '../../constants'
import { from } from '../../utilities'
import { appState } from '../appState'

const standardAnimation: () => number =
	(): number => Math.pow(ANIMATION_RATE, from.Frame(appState.controls.currentFrame))

export default standardAnimation
