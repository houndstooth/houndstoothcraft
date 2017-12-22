import { tile } from '../../../pattern'
import { globalWrapper } from '../../../utilities'
import { appState } from '../../appState'
import { thisPatternHasNotBeenCanceled } from '../pattern'
import { ExecuteTileParams } from './types'
import updateProgress from './updateProgress'

const executeTile: (_: ExecuteTileParams) => void =
	({ address, patternId }: ExecuteTileParams): void => {
		globalWrapper.window.setTimeout(
			() => {
				if (thisPatternHasNotBeenCanceled.default(patternId)) {
					tile.default({ address })
					appState.execute.tilesCompleted++
					updateProgress()
					maybeResolveGrid()
				}
			},
			0,
		)
	}

const maybeResolveGrid: () => void =
	(): void => {
		if (appState.execute.tilesCompleted === appState.execute.tileCount) {
			appState.execute.resolveGrid()
			appState.dom.progressBar.style.width = '0%'
			appState.dom.progressMessage.textContent = ''
			appState.execute.tilesCompleted = 0
		}
	}

export default executeTile
