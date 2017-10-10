import state from '../state'
import saveBlob from './saveBlob'

const saveFrame = ({ blob }: { blob: any }): void => {
	saveBlob({ blob, name: `${state.lastSavedAnimationFrame}.png` })
	state.lastSavedAnimationFrame++
}

export default saveFrame
