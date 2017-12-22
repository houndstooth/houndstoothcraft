import { appState } from '../../appState'

const cancelCurrentPattern: () => void =
	(): void => {
		appState.execute.patternId = Math.random()
	}

export default cancelCurrentPattern
