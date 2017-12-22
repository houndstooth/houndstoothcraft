// tslint:disable:no-unsafe-any

import { resetAppAndPatternStates } from '../../helpers'
import {
	activateTestMarkerCanvas,
	reworkExecutionToFocusOnCanvasOverAnyUserInteractionRelatedMaterial,
} from '../helpers'

beforeEach(() => {
	resetAppAndPatternStates()

	activateTestMarkerCanvas()

	reworkExecutionToFocusOnCanvasOverAnyUserInteractionRelatedMaterial()
})
