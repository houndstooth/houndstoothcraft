import * as from from '../from'
import { DataBlob } from '../page'
import { state } from '../state'
import * as to from '../to'
import { saveBlob } from './saveBlob'

const saveFrame: (result: DataBlob) => void = result => {
	saveBlob({ blob: result, name: `${state.lastSavedAnimationFrame}.png` })
	state.lastSavedAnimationFrame = to.Frame(from.Frame(state.lastSavedAnimationFrame) + 1)
}

export { saveFrame }
