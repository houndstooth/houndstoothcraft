import { NullarySideEffector } from '../../utilities'
import { windowWrapper } from '../dom'
import { state } from '../state'
import gridProgressIntervalFunction from './gridProgressIntervalFunction'

const PROGRESS_UPDATE_RATE: number = 30

const gridComplete: (resolveGrid: NullarySideEffector) => void =
	(resolveGrid: NullarySideEffector): void => {
		state.execute.resolveGrid = resolveGrid
		state.execute.gridProgressInterval = windowWrapper.setInterval(
			gridProgressIntervalFunction,
			PROGRESS_UPDATE_RATE,
		)
	}

export default gridComplete
