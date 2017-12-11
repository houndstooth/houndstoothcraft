// tslint:disable:no-any

import { Frame, Layer, NamedEffect } from '../../pattern'

interface BuildEffectToggleClickHandlerParams {
	checkbox: HTMLInputElement,
	effect: NamedEffect
}

interface ControlsState {
	animating: boolean,
	currentFrame: Frame,
	endFrame: Frame,
	endLayer: Layer,
	exportFrames: boolean,
	selectedEffects: NamedEffect[],
}

export {
	BuildEffectToggleClickHandlerParams,
	ControlsState,
}
