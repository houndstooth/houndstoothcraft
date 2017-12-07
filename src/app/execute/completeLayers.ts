import { NullarySideEffector, to } from '../../utilities'
import { appState } from '../appState'

const completeLayers: NullarySideEffector =
	(): void => {
		appState.dom.layersProgressBar.style.width = '0%'
		appState.execute.currentLayer = to.Layer(0)
	}

export default completeLayers
