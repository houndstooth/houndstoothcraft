import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import clearInterval from './clearInterval'

const gridProgressIntervalFunction: NullarySideEffector =
	(): void => {
		if (appState.execute.tilesCompleted === appState.execute.tileCount) {
			appState.dom.progressBar.style.width = '0%'
			appState.dom.progressMessage.textContent = ''

			clearInterval('gridProgressInterval')
			appState.execute.resolveGrid()
		}
	}

export default gridProgressIntervalFunction
