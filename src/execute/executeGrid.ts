// tslint:disable:no-unsafe-any

import { grid, maybeTile } from '../components'
import { asyncMaybeTile } from '../components/asyncMaybeTile'
import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { gridComplete } from './gridComplete'

const executeGrid: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		if (state.animating || state.syncMode) {
			grid({ gridTile: maybeTile, thisPatternRef })
		}
		else {
			state.tilesCompleted = 0
			grid({ gridTile: asyncMaybeTile, thisPatternRef })
			await new Promise<(resolveGrid: NullarySideEffector) => void>(gridComplete)
		}
	}

export { executeGrid }
