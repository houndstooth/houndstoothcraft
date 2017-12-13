// tslint:disable:no-any

import { Frame, Layer, NamedEffect } from '../../types'

interface ControlsState {
	animating: boolean,
	currentFrame: Frame,
	endFrame: Frame,
	endLayer: Layer,
	exportFrames: boolean,
	selectedEffects: NamedEffect[],
}

export {
	ControlsState,
}
