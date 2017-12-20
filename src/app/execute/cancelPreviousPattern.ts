import { appState } from '../appState'

const cancelPreviousPattern: () => void =
	(): void => {
		appState.execute.frameId = Math.random()
	}

export default cancelPreviousPattern
