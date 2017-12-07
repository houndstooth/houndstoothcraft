import { Frame } from '../../pattern'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import saveCanvas from './saveCanvas'

const exportCanvas: NullarySideEffector =
	(): void => {
		const currentFrame: Frame = appState.controls.currentFrame
		// tslint:disable-next-line:no-unsafe-any
		appState.canvas.mixedDownContext.canvas.toBlob((result: Blob): void => {
			saveCanvas({ result, currentFrame })
		})
	}

export default exportCanvas
