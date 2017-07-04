import shape from '../../../src/components/shape'
import codeUtilities from '../../../src/utilities/codeUtilities'
import rotationUtilities from '../../../src/utilities/rotationUtilities'

describe('shape', () => {
	let renderSpy
	let tileOrigin
	let sizedUnit
	let tileColors
	let colorsIndex
	let getCoordinates
	let coordinatesOptions
	let rotatedCoordinates

	beforeEach(() => {
		spyOn(rotationUtilities, 'applyRotationToShape').and.returnValue(rotatedCoordinates)
		renderSpy = jasmine.createSpy()
		getCoordinates = jasmine.createSpy()
		shape.__Rewire__('render', renderSpy)
	})

	describe('color', () => {
		it('looks for the color in the tile colors using the colors index', () => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 0 })

			shape({ tileOrigin, sizedUnit, tileColors, colorsIndex, getCoordinates, coordinatesOptions })

			expect(codeUtilities.wrappedIndex).toHaveBeenCalledWith({ array: tileColors, index: colorsIndex })
		})
	})

	describe('when the color turns out to be completely transparent', () => {
		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 0 })
		})

		it('returns early, not bothering to get the coordinates, rotate them, or render', () => {
			shape({ tileOrigin, sizedUnit, tileColors, colorsIndex, getCoordinates, coordinatesOptions })

			expect(getCoordinates).not.toHaveBeenCalled()
			expect(rotationUtilities.applyRotationToShape).not.toHaveBeenCalled()
			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when no coordinates are returned from the get coordinates function', () => {
		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue({ a: 1 })
			getCoordinates.and.returnValue(null)
		})

		it('returns early, not trying to rotate nothing or render', () => {
			shape({ tileOrigin, sizedUnit, tileColors, colorsIndex, getCoordinates, coordinatesOptions })

			expect(getCoordinates).toHaveBeenCalledWith({ tileOrigin, sizedUnit, coordinatesOptions })
			expect(rotationUtilities.applyRotationToShape).not.toHaveBeenCalled()
			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when the color is not transparent and coordinates received', () => {
		const coordinates = []
		const shapeColor = { a: 1 }

		beforeEach(() => {
			spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColor)
			getCoordinates.and.returnValue(coordinates)
		})

		it('rotates the coordinates and renders them', () => {
			shape({ tileOrigin, sizedUnit, tileColors, colorsIndex, getCoordinates, coordinatesOptions })

			expect(getCoordinates).toHaveBeenCalledWith({ tileOrigin, sizedUnit, coordinatesOptions })
			expect(rotationUtilities.applyRotationToShape).toHaveBeenCalledWith({ coordinates, tileOrigin, sizedUnit })
			expect(renderSpy).toHaveBeenCalledWith({ shapeColor, coordinates: rotatedCoordinates })
		})
	})

	afterEach(() => {
		shape.__ResetDependency__('render')
	})
})
