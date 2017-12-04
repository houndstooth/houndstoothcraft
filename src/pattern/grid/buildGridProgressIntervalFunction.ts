import { clearInterval } from '../../app'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'
import { BuildGridProgressIntervalFunctionParams } from './types'

const buildGridProgressIntervalFunction: (_: BuildGridProgressIntervalFunctionParams) => NullarySideEffector =
	({ progressBar, progressMessage }: BuildGridProgressIntervalFunctionParams): NullarySideEffector =>
		(): void => {
			if (state.execute.tilesCompleted === state.execute.tileCount) {
				if (progressBar) {
					progressBar.style.width = '0%'
				}
				if (progressMessage) {
					progressMessage.textContent = ''
				}

				clearInterval.default('gridProgressInterval')
				state.execute.resolveGrid()
			}
		}

export default buildGridProgressIntervalFunction
