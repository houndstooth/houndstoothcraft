import * as from from '../../from'
import { state } from '../../state'
import { ConditionFunction } from './types'

const previousFrameHasFinished: ConditionFunction =
	(): boolean => state.tilesCompleted === 0 && from.Layer(state.currentLayer) === 0

export default previousFrameHasFinished
