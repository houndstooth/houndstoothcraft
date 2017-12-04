import { DataBlob } from '../'
import * as from from '../../from'
import { Frame } from '../../pattern'
import { state } from '../../state'
import saveBlob from './saveBlob'

const saveCanvas: (_: { currentFrame: Frame, result: DataBlob }) => void =
	({ currentFrame, result }: { currentFrame: Frame, result: DataBlob }): void => {
		const currentFrameValue: number = from.Frame(currentFrame)
		const name: string = state.controls.exportFrames || currentFrameValue > 0 ?
			`houndstooth_animation_frame_${currentFrameValue}.png` :
			'houndstooth_snapshot.png'
		saveBlob({ blob: result, name })
	}

export default saveCanvas
