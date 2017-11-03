// tslint:disable:no-unsafe-any

import { grid, maybeTile } from '../components'
import { asyncMaybeTile } from '../components/asyncMaybeTile'
import { state } from '../state'
import { NullarySideEffector, NullaryVoidPromise } from '../utilities/types'
import { gridComplete } from './gridComplete'

const executeGrid: NullaryVoidPromise =
	async (): Promise<void> => {
		if (state.animating || state.syncMode) {
			grid({ gridTile: maybeTile })
		}
		else {
			state.tilesCompleted = 0
			grid({ gridTile: asyncMaybeTile })
			await new Promise<(resolveGrid: NullarySideEffector) => void>(gridComplete)
		}
	}

export { executeGrid }
