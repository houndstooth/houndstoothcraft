import { appState } from '../appState'

const cancelCurrentFrame: () => void =
	(): void => {
		appState.execute.frameId = Math.random()
	}

export default cancelCurrentFrame
