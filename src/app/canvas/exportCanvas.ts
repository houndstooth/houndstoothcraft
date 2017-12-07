import { Frame } from '../../pattern'
import { appState } from '../appState'
import saveCanvas from './saveCanvas'

const exportCanvas: () => void =
	(): void => {
		const currentFrame: Frame = appState.controls.currentFrame
		// tslint:disable-next-line:no-unsafe-any
		appState.canvas.mixedDownContext.canvas.toBlob((result: Blob): void => {
			saveCanvas({ result, currentFrame })
		})
	}

export default exportCanvas
