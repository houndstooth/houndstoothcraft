import { NullarySideEffector, to } from '../../utilities'
import { state } from '../state'

const completeLayers: NullarySideEffector =
	(): void => {
		state.dom.layersProgressBar.style.width = '0%'
		state.execute.currentLayer = to.Layer(0)
	}

export default completeLayers
