import { completeLayers, updateOverrideNodes, updateOverrides } from '../../../src/indexForTest'

const stubProblematicNonCanvasUiActivity: () => void =
	(): void => {
		spyOn(completeLayers, 'default')
		spyOn(updateOverrides, 'default')
		spyOn(updateOverrideNodes, 'default')
	}

export default stubProblematicNonCanvasUiActivity
