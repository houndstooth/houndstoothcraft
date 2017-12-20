import { globalWrapper } from '../../../utilities'
import { appState } from '../../appState'
import gridProgressIntervalFunction from './gridProgressIntervalFunction'

const PROGRESS_UPDATE_RATE: number = 30

const gridComplete: (resolveGrid: () => void) => void =
	(resolveGrid: () => void): void => {
		appState.execute.resolveGrid = resolveGrid
		appState.execute.gridProgressInterval = globalWrapper.window.setInterval(
			gridProgressIntervalFunction,
			PROGRESS_UPDATE_RATE,
		)
	}

export default gridComplete
