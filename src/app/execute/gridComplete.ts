import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import { windowWrapper } from '../dom'
import gridProgressIntervalFunction from './gridProgressIntervalFunction'

const PROGRESS_UPDATE_RATE: number = 30

const gridComplete: (resolveGrid: NullarySideEffector) => void =
	(resolveGrid: NullarySideEffector): void => {
		appState.execute.resolveGrid = resolveGrid
		appState.execute.gridProgressInterval = windowWrapper.setInterval(
			gridProgressIntervalFunction,
			PROGRESS_UPDATE_RATE,
		)
	}

export default gridComplete
