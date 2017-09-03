import renderUtilities from '../../../src/utilities/renderUtilities'
import store from '../../../store'
import mockContext from '../helpers/mockContext'

describe('render utilities', () => {
	describe('#clipPath', () => {
		it('saves the context so that the clip can be restored later, then clips the context (with the current path)', () => {
			const contextCallsOrder = []
			const context = mockContext(contextCallsOrder)

			renderUtilities.clipPath({ context })

			expect(contextCallsOrder).toEqual([
				{ method: 'save' },
				{ method: 'clip' },
			])
		})
	})

	describe('#resetClip', () => {
		it('restores the context (with the saved state)', () => {
			const contextCallsOrder = []
			const context = mockContext(contextCallsOrder)

			renderUtilities.resetClip({ context })

			expect(contextCallsOrder).toEqual([
				{ method: 'restore' },
			])
		})
	})

	describe('#buildPath', () => {
		it('draws the path with the correct outline and fills it', () => {
			const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
			const contextCallsOrder = []
			const context = mockContext(contextCallsOrder)

			renderUtilities.buildPath({ context, outline })

			expect(contextCallsOrder).toEqual([
				{ method: 'beginPath' },
				{ method: 'moveTo', x: 0, y: 1 },
				{ method: 'lineTo', x: 1, y: 1 },
				{ method: 'lineTo', x: 1, y: 0 },
			])
		})
	})

	describe('#fillPath', () => {
		it('closes the path and fills it', () => {
			const contextCallsOrder = []
			const context = mockContext(contextCallsOrder)

			renderUtilities.fillPath({ context })

			expect(contextCallsOrder).toEqual([
				{ method: 'closePath' },
				{ method: 'fill' },
			])
		})
	})

	describe('#getCurrentContext', () => {
		it('gets the current context', () => {
			const expectedContext = {}
			store.contexts = [ {}, {}, {}, expectedContext, {}, {} ]
			store.currentLayer = 3

			expect(renderUtilities.getCurrentContext()).toBe(expectedContext)
		})
	})
})
