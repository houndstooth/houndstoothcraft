import { Frame } from '../../pattern'
import { from } from '../../utilities'
import { state } from '../state'

const updateCurrentFrame: (frame: Frame) => void =
	(frame: Frame): void => {
		state.controls.currentFrame = frame

		state.dom.frameInput.value = from.Frame(frame).toString()
	}

export default updateCurrentFrame
