// tslint:disable:no-unsafe-any

import { Canvas, executeGrid, PageElement, resetMixedDownContext, resetState, state } from '../../../src'
import { createTestMarkersCanvas, syncExecuteGridAndMixDownContexts } from '../helpers'

beforeEach(() => {
	resetState.default(state)

	// tslint:disable-next-line:no-unused-expression
	document.querySelector('#test-markers-canvas') || createTestMarkersCanvas()
	const mixedDownCanvas: Canvas = document.createElement('canvas')
	mixedDownCanvas.setAttribute('id', 'mixed-down-canvas')
	const testCanvasDisplayArea: PageElement = document.querySelector('#test-canvas-display-area') as HTMLElement || {}
	testCanvasDisplayArea.appendChild(mixedDownCanvas)

	resetMixedDownContext.default()

	spyOn(executeGrid, 'default').and.callFake(syncExecuteGridAndMixDownContexts)
})
