// tslint:disable:no-unsafe-any

import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { asyncMaybeTile, maybeTile } from '../tile'
import { main as grid } from './grid'
import { main as gridComplete } from './gridComplete'

const executeGrid: (_: { thisPatternRef: number }) => Promise<void> =
	async ({ thisPatternRef }: { thisPatternRef: number }): Promise<void> => {
		if (state.animating || state.syncMode) {
			grid({ gridTile: maybeTile.main, thisPatternRef })
		}
		else {
			state.tilesCompleted = 0
			grid({ gridTile: asyncMaybeTile.main, thisPatternRef })
			await new Promise<(resolveGrid: NullarySideEffector) => void>(gridComplete)
		}
	}

export { executeGrid as main }
