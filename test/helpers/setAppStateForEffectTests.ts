import { appState, Effect, Frame, Layer, NamedEffect, ObjectOf } from '../../src/indexForTest'

const setCurrentFrame: (_: Frame) => void =
	(frame: Frame): void => {
		appState.controls.currentFrame = frame
	}

const setCurrentLayer: (_: Layer) => void =
	(layer: Layer): void => {
		appState.execute.currentLayer = layer
	}

const setAvailableEffects: (_: ObjectOf<NamedEffect>) => void =
	(availableEffects: ObjectOf<NamedEffect>): void => {
		appState.settings.availableEffects = availableEffects
	}

const setSelectedEffects: (_: string[]) => void =
	(selectedEffects: string[]): void => {
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
	setAvailableEffects,
	setOverrides,
}
