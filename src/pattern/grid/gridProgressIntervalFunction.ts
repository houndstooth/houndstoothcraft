import { clearInterval } from '../../app'
import { state } from '../../state'
import { NullarySideEffector } from '../../utilities'

const gridProgressIntervalFunction: NullarySideEffector =
	(): void => {
		if (state.execute.tilesCompleted === state.execute.tileCount) {
			state.dom.progressBar.style.width = '0%'
			state.dom.progressMessage.textContent = ''

			clearInterval.default('gridProgressInterval')
			state.execute.resolveGrid()
		}
	}

export default gridProgressIntervalFunction
