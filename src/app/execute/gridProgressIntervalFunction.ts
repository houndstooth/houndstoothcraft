import { NullarySideEffector } from '../../utilities'
import { state } from '../state'
import clearInterval from './clearInterval'

const gridProgressIntervalFunction: NullarySideEffector =
	(): void => {
		if (state.execute.tilesCompleted === state.execute.tileCount) {
			state.dom.progressBar.style.width = '0%'
			state.dom.progressMessage.textContent = ''

			clearInterval('gridProgressInterval')
			state.execute.resolveGrid()
		}
	}

export default gridProgressIntervalFunction
