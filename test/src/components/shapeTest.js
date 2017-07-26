import shape from '../../../src/components/shape'
import codeUtilities from '../../../src/utilities/codeUtilities'
import componentUtilities from '../../../src/utilities/componentUtilities'
import viewUtilities from '../../../src/utilities/viewUtilities'
import composeMainHoundstooth from '../../../src/state/composeMainHoundstooth'

describe('shape', () => {
	let renderSpy
	const tileOrigin = [ 11, 13 ]
	const tileSize = 45
	const tileColors = []
	const colorsIndex = 7
	let getOutline
	const outlineOptions = {}
	const outlineRotatedAboutShapeCenter = []

	beforeEach(() => {
		composeMainHoundstooth()
		spyOn(componentUtilities, 'rotateCoordinatesAboutCanvasCenter').and.returnValue(outlineRotatedAboutShapeCenter)
		renderSpy = jasmine.createSpy()
		getOutline = jasmine.createSpy()
		shape.__Rewire__('render', renderSpy)
	})

	describe('color', () => {
		it('looks for the color in the tile colors using the colors index', () => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 0 })

			shape({ tileOrigin, tileSize, tileColors, colorsIndex, getOutline, outlineOptions })

			expect(codeUtilities.wrappedIndex).toHaveBeenCalledWith({ array: tileColors, index: colorsIndex })
		})
	})

	describe('when the color turns out to be completely transparent', () => {
		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 0 })
		})

		it('returns early, not bothering to get the outline, rotate it, or render', () => {
			shape({ tileOrigin, tileSize, tileColors, colorsIndex, getOutline, outlineOptions })

			expect(getOutline).not.toHaveBeenCalled()
			expect(componentUtilities.rotateCoordinatesAboutCanvasCenter).not.toHaveBeenCalled()
			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 1 })
			getOutline.and.returnValue(null)
		})

		it('returns early, not trying to rotate nothing or render', () => {
			shape({ tileOrigin, tileSize, tileColors, colorsIndex, getOutline, outlineOptions })

			expect(getOutline).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })
			expect(componentUtilities.rotateCoordinatesAboutCanvasCenter).not.toHaveBeenCalled()
			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when the color is not transparent and an outline is received', () => {
		const outline = []
		const shapeColor = { a: 1 }
		const outlineRotatedAboutCanvasCenter = []

		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColor)
			spyOn(viewUtilities, 'rotateCoordinatesAboutCanvasCenter').and.returnValue(outlineRotatedAboutCanvasCenter)
			getOutline.and.returnValue(outline)
		})

		it('rotates the outline and renders them', () => {
			shape({ tileOrigin, tileSize, tileColors, colorsIndex, getOutline, outlineOptions })

			expect(getOutline).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })
			expect(componentUtilities.rotateCoordinatesAboutCanvasCenter).toHaveBeenCalledWith({
				coordinates: outline,
				tileOrigin,
				tileSize,
			})
			expect(viewUtilities.rotateCoordinatesAboutCanvasCenter).toHaveBeenCalledWith({ coordinates: outlineRotatedAboutShapeCenter })
			expect(renderSpy).toHaveBeenCalledWith({ shapeColor, outline: outlineRotatedAboutCanvasCenter })
		})
	})

	afterEach(() => {
		shape.__ResetDependency__('render')
	})
})
