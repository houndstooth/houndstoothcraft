import { globalWrapper, NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import gridProgressIntervalFunction from './gridProgressIntervalFunction'

const PROGRESS_UPDATE_RATE: number = 30

const gridComplete: (resolveGrid: NullarySideEffector) => void =
	(resolveGrid: NullarySideEffector): void => {
		appState.execute.resolveGrid = resolveGrid
		appState.execute.gridProgressInterval = globalWrapper.window.setInterval(
			gridProgressIntervalFunction,
			PROGRESS_UPDATE_RATE,
		)
	}

export default gridComplete
