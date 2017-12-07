import { appState } from '../appState'

const setTileCount: (_: number) => void =
	(tileCount: number): void => {
		appState.execute.tileCount = tileCount
	}

export default setTileCount
