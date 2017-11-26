import { DataBlob } from '../'
import * as from from '../../from'
import { state } from '../../state'
import * as to from '../../to'
import { main as saveBlob } from './saveBlob'

const saveCanvas: (result: DataBlob) => void =
	(result: DataBlob): void => {
		let name: string
		if (state.exportFrames) {
			name = `houndstooth_animation_frame_${from.Frame(state.lastSavedFrame)}.png`
		}
		else {
			const currentFrame: number = from.Frame(state.currentFrame)
			name = currentFrame > 0 ? `houndstooth_animation_frame_${currentFrame}.png` : 'houndstooth_snapshot.png'
		}
		saveBlob({ blob: result, name })
		state.lastSavedFrame = to.Frame(from.Frame(state.lastSavedFrame) + 1)
	}

export { saveCanvas as main }
