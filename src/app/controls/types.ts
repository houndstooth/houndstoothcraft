// tslint:disable:no-any

import { Frame, Layer } from '../../types'
import { OverrideParentNode } from './override'

interface ControlsState {
	animating: boolean,
	currentFrame: Frame,
	endFrame: Frame,
	endLayer: Layer,
	exportFrames: boolean,
	overrideNodes: OverrideParentNode,
	selectedEffects: string[],
}

export {
	ControlsState,
}
