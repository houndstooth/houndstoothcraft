import render from '../../../src/render/render'
import colorUtilities from '../../../src/utilities/colorUtilities'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import { ERASE } from '../../../src/constants'

describe('render', () => {
	const shapeColor = {}
	const parsedColor = '#012345'
	const contextCallsOrder = []

	beforeEach(() => {
		store.contexts = [
			{
				beginPath: () => contextCallsOrder.push({ method: 'beginPath' }),
				moveTo: (x, y) => contextCallsOrder.push({ method: 'moveTo', x, y }),
				lineTo: (x, y) => contextCallsOrder.push({ method: 'lineTo', x, y }),
				closePath: () => contextCallsOrder.push({ method: 'closePath' }),
				fill: () => contextCallsOrder.push({ method: 'fill' }),
			},
		]

		spyOn(colorUtilities, 'parseColor').and.returnValue(parsedColor)

		contextCallsOrder.length = 0
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

	describe('when layering', () => {
		it('renders to the context of the current layer', () => {
			const layer = 5
			store.mainHoundstooth.basePattern.layerSettings = { endLayer: layer }
			store.currentLayer = layer

			const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

			const laterFrameContextCallsOrder = []

			store.contexts = [
				{}, {}, {}, {}, {},
				{
					beginPath: () => laterFrameContextCallsOrder.push({ method: 'beginPath' }),
					moveTo: (x, y) => laterFrameContextCallsOrder.push({ method: 'moveTo', x, y }),
					lineTo: (x, y) => laterFrameContextCallsOrder.push({ method: 'lineTo', x, y }),
					closePath: () => laterFrameContextCallsOrder.push({ method: 'closePath' }),
					fill: () => laterFrameContextCallsOrder.push({ method: 'fill' }),
				},
			]


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

	describe('erasing', () => {
		const outline = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]
		beforeEach(() => {
			resetStore(store)
			store.contexts = [
				{
					beginPath: () => {},
					moveTo: () => {},
					lineTo: () => {},
					closePath: () => {},
					fill: () => {},
				},
			]
		})

		describe('when not erasing', () => {
			it('sets the operation to source-over', () => {
				render({ shapeColor, outline })

				expect(store.contexts[ 0 ].globalCompositeOperation).toEqual('source-over')
			})
		})

		describe('when erasing', () => {
			it('sets the operation to destination-out', () => {
				render({ shapeColor: ERASE, outline })

				expect(store.contexts[ 0 ].globalCompositeOperation).toEqual('destination-out')
			})
		})
	})
})
