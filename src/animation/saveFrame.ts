import { DataBlob } from '../page'
import { state } from '../state'
import * as from from '../utilities/from'
import * as to from '../utilities/to'
import { saveBlob } from './saveBlob'

const saveFrame: (result: DataBlob) => void = result => {
	saveBlob({ blob: result, name: `${state.lastSavedAnimationFrame}.png` })
	state.lastSavedAnimationFrame = to.Frame(from.Frame(state.lastSavedAnimationFrame) + 1)
}

export { saveFrame }
