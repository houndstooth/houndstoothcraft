import { createOverrideNodes } from './controls'
import { attachHandlers, storeDomElements, updateOverrides } from './dom'
import { setupMixedDownContext } from './render'

const startUpApp: () => void =
	(): void => {
		storeDomElements.default()
		createOverrideNodes.default()
		setupMixedDownContext.default()
		updateOverrides.default()
		attachHandlers.default()
	}

export default startUpApp
