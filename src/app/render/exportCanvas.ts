import { Frame } from '../../types'
import { appState } from '../appState'
import saveCanvas from './saveCanvas'

const exportCanvas: () => void =
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
