import { Layer } from '../../pattern'
import { appState } from '../appState'

const getCurrentLayer: () => Layer = (): Layer => appState.execute.currentLayer

export default getCurrentLayer
