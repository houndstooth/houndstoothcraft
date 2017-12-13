import { appState, clearContext, clearMixedDownContext } from '../../../../../src/indexForTest'

describe('clear mixed down context', () => {
	it('gets the canvas size and the mixed down canvas, and clears', () => {
		const subject: () => void = clearMixedDownContext.default
		// tslint:disable-next-line:no-object-literal-type-assertion
		const mixedDownContext: CanvasRenderingContext2D = {} as CanvasRenderingContext2D
		appState.render.mixedDownContext = mixedDownContext
		spyOn(clearContext, 'default')

		subject()

		expect(clearContext.default).toHaveBeenCalledWith(mixedDownContext)
	})
})
