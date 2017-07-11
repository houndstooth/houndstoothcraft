import render from '../../../src/render/render'
import ctx from '../../../src/render/ctx'
import colorUtilities from '../../../src/utilities/colorUtilities'

describe('render', () => {
	const shapeColor = {}
	const parsedColor = '#012345'
	const ctxCallsOrder = []

	beforeEach(() => {
		spyOn(colorUtilities, 'parseColor').and.returnValue(parsedColor)

		ctxCallsOrder.length = 0
		spyOn(ctx, 'beginPath').and.callThrough().and.callFake(() => ctxCallsOrder.push({ method: 'beginPath' }))
		spyOn(ctx, 'moveTo').and.callThrough().and.callFake((x, y) => ctxCallsOrder.push({ method: 'moveTo', x, y }))
		spyOn(ctx, 'lineTo').and.callThrough().and.callFake((x, y) => ctxCallsOrder.push({ method: 'lineTo', x, y }))
		spyOn(ctx, 'closePath').and.callThrough().and.callFake(() => ctxCallsOrder.push({ method: 'closePath' }))
		spyOn(ctx, 'fill').and.callThrough().and.callFake(() => ctxCallsOrder.push({ method: 'fill' }))
	})

	it('returns early if there are no coordinates', () => {
		const coordinates = []

		render({ shapeColor, coordinates })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(ctxCallsOrder).toEqual([])
	})

	it('returns early if there is only one coordinate, because a point has no area', () => {
		const coordinates = [ [ 0, 1 ] ]

		render({ shapeColor, coordinates })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(ctxCallsOrder).toEqual([])
	})

	it('returns early if there are only two coordinates, because a line has no area', () => {
		const coordinates = [ [ 0, 1 ], [ 1, 1 ] ]

		render({ shapeColor, coordinates })

		expect(colorUtilities.parseColor).not.toHaveBeenCalled()
		expect(ctxCallsOrder).toEqual([])
	})

	describe('when there are at least three coordinates', () => {
		beforeEach(() => {
			const coordinates = [ [ 0, 1 ], [ 1, 1 ], [ 1, 0 ] ]

			render({ shapeColor, coordinates })
		})

		it('parses the shape\'s color', () => {
			expect(colorUtilities.parseColor).toHaveBeenCalledWith(shapeColor)
		})

		it('assigns the parsed color to the context\'s fill style', () => {
			expect(ctx.fillStyle).toEqual(parsedColor)
		})

		it('draws the path with the correct coordinates and fills it', () => {
			expect(ctxCallsOrder).toEqual([
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
