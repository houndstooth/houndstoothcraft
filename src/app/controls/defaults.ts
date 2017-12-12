// tslint:disable:no-any

import { Frame, Layer, NamedEffect } from '../../types'
import { ControlsState } from './types'

const DEFAULT_ANIMATING: boolean = false
const DEFAULT_CURRENT_FRAME: Frame = 0 as any
const DEFAULT_END_FRAME: Frame = 0 as any
const DEFAULT_END_LAYER: Layer = 0 as any
const DEFAULT_EXPORT_FRAMES: boolean = false
const DEFAULT_SELECTED_EFFECTS: NamedEffect[] = []

const DEFAULT_CONTROLS_STATE: ControlsState = {
	animating: DEFAULT_ANIMATING,
	currentFrame: DEFAULT_CURRENT_FRAME,
	endFrame: DEFAULT_END_FRAME,
	endLayer: DEFAULT_END_LAYER,
	exportFrames: DEFAULT_EXPORT_FRAMES,
	selectedEffects: DEFAULT_SELECTED_EFFECTS,
}

export {
	DEFAULT_CONTROLS_STATE,
}
