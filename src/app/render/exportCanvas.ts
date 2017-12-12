import { Frame } from '../../types'
import { NullarySideEffector } from '../../utilities'
import { appState } from '../appState'
import saveCanvas from './saveCanvas'

const exportCanvas: NullarySideEffector =
	(): void => {
		const currentFrame: Frame = appState.controls.currentFrame
		// tslint:disable-next-line:no-unsafe-any
		appState.render.mixedDownContext.canvas.toBlob((result: Blob | null): void => {
			/* istanbul ignore else */
			if (result) {
				saveCanvas({ result, currentFrame })
			}
		})
	}

export default exportCanvas
