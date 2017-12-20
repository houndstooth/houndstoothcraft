import { appState } from '../../appState'

const enableOrDisableAnimationControls: () => void =
	(): void => {
		const canBeAnimated: boolean = mainHoundstoothHasAnimations()

		appState.dom.frameInput.disabled = canBeAnimated
		appState.dom.playButton.disabled = canBeAnimated
		appState.dom.pauseButton.disabled = true
		appState.dom.rewindButton.disabled = true
	}

const mainHoundstoothHasAnimations: () => boolean =
	(): boolean => !Object.keys(appState.settings.mainHoundstooth.animationsPattern).length

export default enableOrDisableAnimationControls
