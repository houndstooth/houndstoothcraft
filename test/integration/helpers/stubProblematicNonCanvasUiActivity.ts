import { completeLayers, NullarySideEffector } from '../../../src/indexForTest'

const stubProblematicNonCanvasUiActivity: NullarySideEffector =
	(): void => {
		spyOn(completeLayers, 'default')
	}

export default stubProblematicNonCanvasUiActivity
