import { Frame } from '../../pattern'
import { state } from '../../state'
import saveCanvas from './saveCanvas'

const exportCanvas: () => void =
	(): void => {
		const currentFrame: Frame = state.currentFrame
		// tslint:disable-next-line:no-unsafe-any no-unused-expression
		state.mixedDownContext && state.mixedDownContext.canvas.toBlob((result: Blob): void => {
			saveCanvas({ result, currentFrame })
		})
	}

export default exportCanvas
