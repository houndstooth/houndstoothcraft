import { Frame } from '../../pattern'
import { from } from '../../utilities'
import { appState } from '../appState'
import { saveBlob } from '../dom'
import { DataBlob } from './types'

const saveCanvas: (_: { currentFrame: Frame, result: DataBlob }) => void =
	({ currentFrame, result }: { currentFrame: Frame, result: DataBlob }): void => {
		const currentFrameValue: number = from.Frame(currentFrame)
		const name: string = appState.controls.exportFrames || currentFrameValue > 0 ?
			`houndstooth_animation_frame_${currentFrameValue}.png` :
			'houndstooth_snapshot.png'
		saveBlob.default({ blob: result, name })
	}

export default saveCanvas
