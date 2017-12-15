import { completeLayers, updateOverrides } from '../../../src/indexForTest'

const stubProblematicNonCanvasUiActivity: () => void =
	(): void => {
		spyOn(completeLayers, 'default')
		spyOn(updateOverrides, 'default')
	}

export default stubProblematicNonCanvasUiActivity
