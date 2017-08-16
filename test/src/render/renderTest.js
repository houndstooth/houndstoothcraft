import render from '../../../src/render/render'
import colorUtilities from '../../../src/utilities/colorUtilities'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import setupContexts from '../../../src/application/setupContexts'
import setupCanvases from '../../../src/application/setupCanvases'
import setupMixedDownCanvas from '../../../src/render/setupMixedDownCanvas'

describe('render', () => {
	const shapeColor = {}
	const parsedColor = '#012345'
	const contextCallsOrder = []

	beforeEach(() => {
		resetStore(store)
		setupCanvases()
		setupMixedDownCanvas()
		setupContexts()

		spyOn(colorUtilities, 'parseColor').and.returnValue(parsedColor)

		contextCallsOrder.length = 0
		spyOn(store.contexts[0], 'beginPath').and.callThrough().and.callFake(() => contextCallsOrder.push({ method: 'beginPath' }))
		spyOn(store.contexts[0], 'moveTo').and.callThrough().and.callFake((x, y) => contextCallsOrder.push({
			method: 'moveTo',
			x,
			y,
		}))
		spyOn(store.contexts[ 0 ], 'lineTo').and.callThrough().and.callFake((x, y) => contextCallsOrder.push({
			method: 'lineTo',
			x,
			y,
		}))
		spyOn(store.contexts[ 0 ], 'closePath').and.callThrough().and.callFake(() => contextCallsOrder.push({ method: 'closePath' }))
		spyOn(store.contexts[ 0 ], 'fill').and.callThrough().and.callFake(() => contextCallsOrder.push({ method: 'fill' }))
	})

	it('returns early if there are no coordinates in the outline', () => {
		const outline = []

		render({ shapeColor, outline })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(contextCallsOrder).toEqual([])
	})

	it('returns early if there is only one coordinate in the outline, because a point has no area', () => {
		const outline = [ [ 0, 1 ] ]

		render({ shapeColor, outline })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(contextCallsOrder).toEqual([])
	})

	it('returns early if there are only two coordinates in the outline, because a line has no area', () => {
		const outline = [ [ 0, 1 ], [ 1, 1 ] ]

		render({ shapeColor, outline })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(contextCallsOrder).toEqual([])
	})

	describe('when there are at least three coordinates in the outline', () => {
		beforeEach(() => {
			const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

			render({ shapeColor, outline })
		})

		it('parses the shape\'s color', () => {
			expect(colorUtilities.parseColor).toHaveBeenCalledWith(shapeColor)
		})

		it('assigns the parsed color to the context\'s fill style', () => {
			expect(store.contexts[ 0 ].fillStyle).toEqual(parsedColor)
		})

		it('draws the path with the correct outline and fills it', () => {
			expect(contextCallsOrder).toEqual([
				{ method: 'beginPath' },
				{ method: 'moveTo', x: 0, y: 1 },
				{ method: 'lineTo', x: 1, y: 1 },
				{ method: 'lineTo', x: 1, y: 0 },
				{ method: 'closePath' },
				{ method: 'fill' },
			])
		})
	})

	describe('when iterating', () => {
		it('renders to the context of the current iteration frame', () => {
			const frame = 5
			store.mainHoundstooth.basePattern.iterationSettings = { endIterationFrame: frame }
			store.iterationFrame = frame
			setupCanvases()
			setupMixedDownCanvas()
			setupContexts()

			const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

			const laterFrameContextCallsOrder = []
			spyOn(store.contexts[ frame ], 'beginPath').and.callThrough().and.callFake(() => laterFrameContextCallsOrder.push({ method: 'beginPath' }))
			spyOn(store.contexts[ frame ], 'moveTo').and.callThrough().and.callFake((x, y) => laterFrameContextCallsOrder.push({
				method: 'moveTo',
				x,
				y,
			}))
			spyOn(store.contexts[ frame ], 'lineTo').and.callThrough().and.callFake((x, y) => laterFrameContextCallsOrder.push({
				method: 'lineTo',
				x,
				y,
			}))
			spyOn(store.contexts[ frame ], 'closePath').and.callThrough().and.callFake(() => laterFrameContextCallsOrder.push({ method: 'closePath' }))
			spyOn(store.contexts[ frame ], 'fill').and.callThrough().and.callFake(() => laterFrameContextCallsOrder.push({ method: 'fill' }))

			render({ shapeColor, outline })

			expect(laterFrameContextCallsOrder).toEqual([
				{ method: 'beginPath' },
				{ method: 'moveTo', x: 0, y: 1 },
				{ method: 'lineTo', x: 1, y: 1 },
				{ method: 'lineTo', x: 1, y: 0 },
				{ method: 'closePath' },
				{ method: 'fill' },
			])
		})
	})
})
