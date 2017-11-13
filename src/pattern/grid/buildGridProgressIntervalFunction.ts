import { state } from '../../state'
import { NullarySideEffector, windowWrapper } from '../../utilities'
import { BuildGridProgressIntervalFunctionParams } from './types'

const buildGridProgressIntervalFunction: (_: BuildGridProgressIntervalFunctionParams) => NullarySideEffector =
	({ progressBar }: BuildGridProgressIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			if (state.tilesCompleted === state.tileCount) {
				if (progressBar) {
					progressBar.style.width = '0%'
				}

				// tslint:disable-next-line:no-unsafe-any
				windowWrapper.clearInterval(state.gridProgressInterval)
				state.resolveGrid()
			}
		}

export { buildGridProgressIntervalFunction }
