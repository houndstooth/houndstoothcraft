import { appState } from '../../appState'

const mainHoundstoothHasAnimations: () => boolean =
	(): boolean =>
		!!Object.keys(appState.settings.mainHoundstooth.animationsPattern).length

export default mainHoundstoothHasAnimations
