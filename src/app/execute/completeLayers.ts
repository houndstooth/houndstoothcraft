import { state } from '../../state'
import * as to from '../../to'
import { NullarySideEffector } from '../../utilities'

const completeLayers: NullarySideEffector =
	(): void => {
		state.dom.layersProgressBar.style.width = '0%'
		state.execute.currentLayer = to.Layer(0)
	}

export default completeLayers
