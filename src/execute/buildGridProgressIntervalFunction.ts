import { state } from '../state'
import { NullarySideEffector } from '../utilities/types'
import { windowWrapper } from '../utilities/windowWrapper'
import { BuildGridProgressIntervalFunctionParams } from './types'

const buildGridProgressIntervalFunction: (_: BuildGridProgressIntervalFunctionParams) => NullarySideEffector =
	({ progressBar }: BuildGridProgressIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			if (state.tilesCompleted === state.tileCount) {
				if (progressBar) {
					progressBar.style.height = '0%'
				}

				// tslint:disable-next-line:no-unsafe-any
				windowWrapper.clearInterval(state.gridProgressInterval)
				if (state.resolveGrid) {
					state.resolveGrid()
				}
			}
		}

export { buildGridProgressIntervalFunction }
