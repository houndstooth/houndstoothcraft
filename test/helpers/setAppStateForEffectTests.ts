import { appState, Frame, Layer, NamedEffect } from '../../src/indexForTest'
import { Effect } from '../../src/types'

const setCurrentFrame: (_: Frame) => void =
	(frame: Frame): void => {
		appState.controls.currentFrame = frame
	}

const setCurrentLayer: (_: Layer) => void =
	(layer: Layer): void => {
		appState.execute.currentLayer = layer
	}

const setSelectedEffects: (_: NamedEffect[]) => void =
	(selectedEffects: NamedEffect[]): void => {
		appState.controls.selectedEffects = selectedEffects
	}

const setOverrides: (_: Effect) => void =
	(overrides: Effect): void => {
		appState.settings.overrides = overrides
	}

export {
	setCurrentFrame,
	setCurrentLayer,
	setSelectedEffects,
	setOverrides,
}
