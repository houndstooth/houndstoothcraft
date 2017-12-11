import { appState } from '../../src/app/appState'
import { Frame } from '../../src/pattern/animation/types'
import { Layer } from '../../src/pattern/layer/types'
import { NamedEffect } from '../../src/pattern/types'

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

export {
	setCurrentFrame,
	setCurrentLayer,
	setSelectedEffects,
}
