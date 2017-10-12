import state from '../state'
import saveBlob from './saveBlob'

const saveFrame: { ({}: { blob: Blob }): void } = ({ blob }) => {
	saveBlob({ blob, name: `${state.lastSavedAnimationFrame}.png` })
	state.lastSavedAnimationFrame++
}

export default saveFrame
