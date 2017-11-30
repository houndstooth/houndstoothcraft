import activateTestMarkerCanvas from './activateTestMarkerCanvas'
import createTestMarkersCanvas from './createTestMarkersCanvas'
import fakeAnimator from './fakeAnimator'
import pixelIsColor from './pixelIsColor'
import pixelIsColorWithMarker from './pixelIsColorWithMarker'
import sectionCenterIsColor from './sectionCenterIsColor'
import standardTileIsColors from './standardTileIsColors'
import syncExecuteGridAndMixDownContexts from './syncExecuteGridAndMixDownContexts'
import { thisFrameOnly, thisLayerOnly } from './thisFrameOnly'
import {
	Diagonal,
	ExpectDiagonalDividedSection,
	ExpectedDividedSection,
	ExpectedSolidSection,
	ExpectSolidSection,
	PixelColorExpectation,
	StandardTileExpectation,
} from './types'

export {
	activateTestMarkerCanvas,
	createTestMarkersCanvas,
	sectionCenterIsColor,
	thisLayerOnly,
	Diagonal,
	ExpectDiagonalDividedSection,
	ExpectedDividedSection,
	ExpectedSolidSection,
	ExpectSolidSection,
	fakeAnimator,
	thisFrameOnly,
	standardTileIsColors,
	StandardTileExpectation,
	pixelIsColorWithMarker,
	PixelColorExpectation,
	pixelIsColor,
	syncExecuteGridAndMixDownContexts,
}
