import { appState } from '../appState'

const cancelPreviousPattern: () => void =
	(): void => {
		appState.execute.patternRef = Math.random()
	}

export default cancelPreviousPattern
