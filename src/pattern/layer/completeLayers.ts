import { state } from '../../state'
import * as to from '../../to'
import { documentWrapper, NullarySideEffector } from '../../utilities'

const completeLayers: NullarySideEffector =
	(): void => {
		// tslint:disable-next-line:no-unsafe-any max-line-length
		const layersProgressBar: HTMLElement = documentWrapper.querySelector('#layers-progress-bar') as HTMLElement
		if (layersProgressBar) {
			layersProgressBar.style.width = '0%'
		}
		state.currentLayer = to.Layer(0)
	}

export default completeLayers
