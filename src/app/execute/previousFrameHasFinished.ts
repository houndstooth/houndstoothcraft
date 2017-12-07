import { from } from '../../utilities'
import { appState } from '../appState'
import { ConditionFunction } from './types'

const previousFrameHasFinished: ConditionFunction =
	(): boolean => appState.execute.tilesCompleted === 0 && from.Layer(appState.execute.currentLayer) === 0

export default previousFrameHasFinished
