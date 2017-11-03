import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { windowWrapper } from '../utilities/windowWrapper'
import { BuildProgressIntervalFunctionParams } from './types'

const buildProgressIntervalFunction: (_: BuildProgressIntervalFunctionParams) => NullarySideEffector =
	({ progressBar, resolveGrid }: BuildProgressIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			if (state.tilesCompleted === state.tileCount) {
				if (progressBar) {
					progressBar.style.height = '0%'
				}

				// tslint:disable-next-line:no-unsafe-any
				windowWrapper.clearInterval(state.progressInterval)
				resolveGrid()
			}
		}

export { buildProgressIntervalFunction }
