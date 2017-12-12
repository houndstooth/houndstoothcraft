import { Frame } from '../../types'
import { appState } from '../appState'

const getCurrentFrame: () => Frame =
	(): Frame => appState.controls.currentFrame

export default getCurrentFrame
