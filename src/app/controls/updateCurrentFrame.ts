import * as from from '../../from'
import { Frame } from '../../pattern'
import { state } from '../../state'

const updateCurrentFrame: (frame: Frame) => void =
	(frame: Frame): void => {
		state.controls.currentFrame = frame

		state.dom.frameInput.value = from.Frame(frame).toString()
	}

export default updateCurrentFrame
