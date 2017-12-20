import { Frame } from '../../../types'
import { from } from '../../../utilities'
import { appState } from '../../appState'

const updateCurrentFrame: (frame: Frame) => void =
	(frame: Frame): void => {
		appState.controls.currentFrame = frame

		appState.dom.frameInput.value = from.Frame(frame).toString()
	}

export default updateCurrentFrame
