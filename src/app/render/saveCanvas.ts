import { from } from '../../utilities'
import { appState } from '../appState'
import { saveBlobThroughAnchor } from '../dom'

const saveCanvas: () => void =
	(): void => {
		// tslint:disable-next-line:no-unsafe-any
		appState.render.mixedDownContext.canvas.toBlob((result: Blob | null): void => {
			/* istanbul ignore else */
			if (result) {
				saveBlob(result)
			}
		})
	}

const saveBlob: (_: Blob) => void =
	(result: Blob): void => {
		const currentFrameValue: number = from.Frame(appState.controls.currentFrame)
		const name: string = appState.controls.exportFrames || currentFrameValue > 0 ?
			`houndstooth_animation_frame_${currentFrameValue}.png` :
			'houndstooth_snapshot.png'
		saveBlobThroughAnchor.default({ blob: result, name })
	}

export default saveCanvas
