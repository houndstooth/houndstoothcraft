import { state } from '../../state'
import { NullarySideEffector, windowWrapper } from '../../utilities'
import { BuildGridProgressIntervalFunctionParams } from './types'

const buildGridProgressIntervalFunction: (_: BuildGridProgressIntervalFunctionParams) => NullarySideEffector =
	({ progressBar, progressMessage }: BuildGridProgressIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			if (state.tilesCompleted === state.tileCount) {
				if (progressBar) {
					progressBar.style.width = '0%'
				}
				if (progressMessage) {
					progressMessage.textContent = ''
				}

				// tslint:disable-next-line:no-unsafe-any
				windowWrapper.clearInterval(state.gridProgressInterval)
				state.resolveGrid()
			}
		}

export default buildGridProgressIntervalFunction
