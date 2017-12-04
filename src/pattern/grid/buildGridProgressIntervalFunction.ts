import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { clearInterval } from '../../app'
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

				clearInterval.default('gridProgressInterval')
				state.resolveGrid()
			}
		}

export default buildGridProgressIntervalFunction
