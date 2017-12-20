// tslint:disable:no-any

import { Frame, Layer } from '../../types'
import { OverrideParentNode } from './override'
import { ControlsState } from './types'

const DEFAULT_OVERRIDE_NODES_ANIMATIONS_PATTERN: OverrideParentNode = { open: false, children: {} }
const DEFAULT_OVERRIDE_NODES_BASE_PATTERN: OverrideParentNode = { open: true, children: {} }
const DEFAULT_OVERRIDE_NODES_LAYERS_PATTERN: OverrideParentNode = { open: false, children: {} }

const DEFAULT_ANIMATING: boolean = false
const DEFAULT_CURRENT_FRAME: Frame = 0 as any
const DEFAULT_END_FRAME: Frame = 0 as any
const DEFAULT_END_LAYER: Layer = 0 as any
const DEFAULT_EXPORT_FRAMES: boolean = false
const DEFAULT_OVERRIDE_NODES: OverrideParentNode = {
	children: {
		animationsPattern: DEFAULT_OVERRIDE_NODES_ANIMATIONS_PATTERN,
		basePattern: DEFAULT_OVERRIDE_NODES_BASE_PATTERN,
		layersPattern: DEFAULT_OVERRIDE_NODES_LAYERS_PATTERN,
	},
	open: true,
}
const DEFAULT_SELECTED_EFFECTS: string[] = []

const DEFAULT_CONTROLS_STATE: ControlsState = {
	animating: DEFAULT_ANIMATING,
	currentFrame: DEFAULT_CURRENT_FRAME,
	endFrame: DEFAULT_END_FRAME,
	endLayer: DEFAULT_END_LAYER,
	exportFrames: DEFAULT_EXPORT_FRAMES,
	overrideNodes: DEFAULT_OVERRIDE_NODES,
	selectedEffects: DEFAULT_SELECTED_EFFECTS,
}

export {
	DEFAULT_CONTROLS_STATE,
}
