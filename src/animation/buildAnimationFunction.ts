import state from '../state'
import { callFunctionsPerSetting, executeGrid } from '../execute'
import { clear } from '../canvas'
import { deepClone } from '../utilities/codeUtilities'
import exportFrame from './exportFrame'

type BuildAnimationFunction = {
	({}: {
		startAnimationFrame: number,
		animationFunctions: Array<() => void>,
		layerFunctions: Array<() => void>,
		refreshCanvas: boolean,
	}): () => void,
}
const buildAnimationFunction: BuildAnimationFunction = buildAnimationFunctionParams => {
	const { startAnimationFrame, animationFunctions, layerFunctions, refreshCanvas } = buildAnimationFunctionParams
	return () => {
		if (exportingFramesStillNeedsToCatchUp()) {
			return
		}

		if (beginningOfAnimationThatShouldBeSeenHasBeenReached(startAnimationFrame)) {
			animate({ layerFunctions, refreshCanvas })
		}

		callFunctionsPerSetting({ settingsFunctions: animationFunctions })
		state.currentAnimationFrame++
	}
}

const exportingFramesStillNeedsToCatchUp = (): boolean => {
	return state.exportFrames && state.currentAnimationFrame > state.lastSavedAnimationFrame
}

const beginningOfAnimationThatShouldBeSeenHasBeenReached = (startAnimationFrame: number): boolean => {
	return state.currentAnimationFrame >= startAnimationFrame
}

type Animate = {
	({ layerFunctions, refreshCanvas }: { layerFunctions: Array<() => void>, refreshCanvas: boolean }): void,
}
const animate: Animate = ({ layerFunctions, refreshCanvas }) => {
	if (refreshCanvas) {
		clear()
	}

	const preLayerSettings = deepClone(state.mainHoundstooth.basePattern)
	executeGrid({ layerFunctions })
	Object.assign(state.mainHoundstooth.basePattern, preLayerSettings)

	if (state.exportFrames) {
		exportFrame()
	}
}

export default buildAnimationFunction
