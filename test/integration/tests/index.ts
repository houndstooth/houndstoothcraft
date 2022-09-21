// tslint:disable:no-unsafe-any

import { wrapper as executeGridWrapper } from '../../../src/app/execute/grid/executeGrid'
import { wrapper as executeTileWrapper } from '../../../src/app/execute/tile/executeTile'
import {
	CANVAS_SIZE,
	from,
	grid,
	mixDownContexts,
	startUpApp,
	tile,
} from '../../../src/indexForTest'
import { resetAppAndPatternStates } from '../../helpers'
import testMarkersClear from '../helpers/testMarkersClear'

beforeEach(() => {
	resetAppAndPatternStates()

	startUpApp.default()

	testMarkersClear()

	const testMarkersCanvas: HTMLCanvasElement = document.querySelector('#test-markers-canvas') as HTMLCanvasElement
	testMarkersCanvas.width = from.Px(CANVAS_SIZE)
	testMarkersCanvas.height = from.Px(CANVAS_SIZE)

	// @ts-ignore
	spyOn(executeGridWrapper, 'executeGrid').and.callFake(fakeGrid)
	// @ts-ignore
	spyOn(executeTileWrapper, 'executeTile').and.callFake(tile.default)
})

const fakeGrid: () => void =
	(): void => {
		grid.default({ patternId: 0 })
		mixDownContexts.default()
	}
