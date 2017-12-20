import { appState } from '../../appState'

const incrementTilesCompleted: () => void =
	(): void => {
		appState.execute.tilesCompleted++
	}

export default incrementTilesCompleted
