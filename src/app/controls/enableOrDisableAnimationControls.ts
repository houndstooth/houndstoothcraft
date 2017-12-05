import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'

const enableOrDisableAnimationControls: NullarySideEffector =
	(): void => {
		const canBeAnimated: boolean = mainHoundstoothHasAnimations()

		state.dom.frameInput.disabled = canBeAnimated
		state.dom.playButton.disabled = canBeAnimated
		state.dom.pauseButton.disabled = true
		state.dom.rewindButton.disabled = true
	}

const mainHoundstoothHasAnimations: () => boolean =
	(): boolean => !Object.keys(state.settings.mainHoundstooth.animationsPattern).length

export default enableOrDisableAnimationControls
