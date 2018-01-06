// tslint:disable:no-unsafe-any

import {
	attachHandlers,
	CANVAS_SIZE,
	createOverrideNodes,
	executeGrid,
	executeTile,
	from,
	grid,
	mixDownContexts,
	setupMixedDownContext,
	storeDomElements,
	tile,
	updateOverrides,
} from '../../../src/indexForTest'
import { resetAppAndPatternStates } from '../../helpers'
import testMarkersClear from '../helpers/testMarkersClear'

beforeEach(() => {
	resetAppAndPatternStates()

	storeDomElements.default()
	createOverrideNodes.default()
	setupMixedDownContext.default()
	updateOverrides.default()
	attachHandlers.default()

	testMarkersClear()

	const testMarkersCanvas: HTMLCanvasElement = document.querySelector('#test-markers-canvas') as HTMLCanvasElement
	testMarkersCanvas.width = from.Px(CANVAS_SIZE)
	testMarkersCanvas.height = from.Px(CANVAS_SIZE)

	spyOn(executeGrid, 'default').and.callFake(fakeGrid)
	spyOn(executeTile, 'default').and.callFake(tile.default)
})

const fakeGrid: () => void =
	(): void => {
		grid.default({ patternId: 0 })
		mixDownContexts.default()
	}
