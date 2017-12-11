import { appState } from '../appState'
import { Layer } from '../../pattern'

const getCurrentLayer: () => Layer = (): Layer => appState.execute.currentLayer

export default getCurrentLayer
