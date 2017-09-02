import renderUtilities from '../../../src/utilities/renderUtilities'
import store from '../../../store'
import mockContext from '../helpers/mockContext'

describe('render utilities', () => {
	describe('#clipPath', () => {
		it('clips the context (with the current path)', () => {
			const context = { clip: jasmine.createSpy() }
			renderUtilities.clipPath({ context })
			expect(context.clip).toHaveBeenCalled()
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
