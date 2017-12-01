import * as from from '../../from'
import { Frame } from '../../pattern'
import { state } from '../../state'
import { documentWrapper } from '../../utilities'

const updateCurrentFrame: (frame: Frame) => void =
	(frame: Frame): void => {
		state.currentFrame = frame

		// tslint:disable-next-line:no-unsafe-any
		const frameInput: HTMLInputElement = documentWrapper.querySelector('#frame-input') as HTMLInputElement
		frameInput.value = from.Frame(frame).toString()
	}

export default updateCurrentFrame
