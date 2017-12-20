import { appState } from '../../appState'
import clearIntervalAndRemoveFromState from '../clearIntervalAndRemoveFromState'

const gridProgressIntervalFunction: () => void =
	(): void => {
		if (appState.execute.tilesCompleted === appState.execute.tileCount) {
			appState.dom.progressBar.style.width = '0%'
			appState.dom.progressMessage.textContent = ''

			clearIntervalAndRemoveFromState('gridProgressInterval')
			appState.execute.resolveGrid()
		}
	}

export default gridProgressIntervalFunction
