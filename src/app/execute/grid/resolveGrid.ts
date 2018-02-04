import { appState } from '../../appState'

const resolveGrid: () => void =
	(): void => {
		appState.execute.resolveGrid()
		appState.dom.progressBar.style.width = '0%'
		appState.dom.progressMessage.textContent = ''
		appState.execute.tilesCompleted = 0
	}

export default resolveGrid
