import { completeLayers } from '../../../src/indexForTest'

const stubProblematicNonCanvasUiActivity: () => void =
	(): void => {
		spyOn(completeLayers, 'default')
	}

export default stubProblematicNonCanvasUiActivity
