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
	let getCoordinates
	const coordinatesOptions = {}
	const coordinatesRotatedAboutShapeCenter = []

	beforeEach(() => {
		composeMainHoundstooth()
		spyOn(componentUtilities, 'rotateShapeAboutShapeCenter').and.returnValue(coordinatesRotatedAboutShapeCenter)
		renderSpy = jasmine.createSpy()
		getCoordinates = jasmine.createSpy()
		shape.__Rewire__('render', renderSpy)
	})

	describe('color', () => {
		it('looks for the color in the tile colors using the colors index', () => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 0 })

			shape({ tileOrigin, tileSize, tileColors, colorsIndex, getCoordinates, coordinatesOptions })

			expect(codeUtilities.wrappedIndex).toHaveBeenCalledWith({ array: tileColors, index: colorsIndex })
		})
	})

	describe('when the color turns out to be completely transparent', () => {
		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 0 })
		})

		it('returns early, not bothering to get the coordinates, rotate them, or render', () => {
			shape({ tileOrigin, tileSize, tileColors, colorsIndex, getCoordinates, coordinatesOptions })

			expect(getCoordinates).not.toHaveBeenCalled()
			expect(componentUtilities.rotateShapeAboutShapeCenter).not.toHaveBeenCalled()
			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when no coordinates are returned from the get coordinates function', () => {
		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 1 })
			getCoordinates.and.returnValue(null)
		})

		it('returns early, not trying to rotate nothing or render', () => {
			shape({ tileOrigin, tileSize, tileColors, colorsIndex, getCoordinates, coordinatesOptions })

			expect(getCoordinates).toHaveBeenCalledWith({ tileOrigin, tileSize, coordinatesOptions })
			expect(componentUtilities.rotateShapeAboutShapeCenter).not.toHaveBeenCalled()
			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when the color is not transparent and coordinates received', () => {
		const coordinates = []
		const shapeColor = { a: 1 }
		const coordinatesRotatedAboutCanvasCenter = []

		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColor)
			spyOn(viewUtilities, 'rotateShapeAboutCanvasCenter').and.returnValue(coordinatesRotatedAboutCanvasCenter)
			getCoordinates.and.returnValue(coordinates)
		})

		it('rotates the coordinates and renders them', () => {
			shape({ tileOrigin, tileSize, tileColors, colorsIndex, getCoordinates, coordinatesOptions })

			expect(getCoordinates).toHaveBeenCalledWith({ tileOrigin, tileSize, coordinatesOptions })
			expect(componentUtilities.rotateShapeAboutShapeCenter).toHaveBeenCalledWith({ coordinates, tileOrigin, tileSize })
			expect(viewUtilities.rotateShapeAboutCanvasCenter).toHaveBeenCalledWith({ coordinates: coordinatesRotatedAboutShapeCenter })
			expect(renderSpy).toHaveBeenCalledWith({ shapeColor, coordinates: coordinatesRotatedAboutCanvasCenter })
		})
	})

	afterEach(() => {
		shape.__ResetDependency__('render')
	})
})
