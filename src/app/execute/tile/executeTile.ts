import { tile } from '../../../pattern'
import { globalWrapper } from '../../../utilities'
import { appState } from '../../appState'
import { resolveGrid } from '../grid'
import { thisPatternHasNotBeenCanceled } from '../pattern'

import { ExecuteTileParams } from './types'
import updateProgress from './updateProgress'

const executeTile: (_: ExecuteTileParams) => void =
	({ address, patternId }: ExecuteTileParams): void => {
		globalWrapper.window.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled.default(patternId)) {
					tile.default({ address })
					appState.execute.tilesCompleted += 1
					updateProgress()
					maybeResolveGrid()
				}
				else {
					resolveGrid.default()
				}
			},
			0,
		)
	}

const maybeResolveGrid: () => void =
	(): void => {
		if (appState.execute.tilesCompleted === appState.execute.tileCount) {
			resolveGrid.default()
		}
	}

export const wrapper = { executeTile }
