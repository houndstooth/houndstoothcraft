import shape from '../../../src/components/shape'
import codeUtilities from '../../../src/utilities/codeUtilities'
import componentUtilities from '../../../src/utilities/componentUtilities'
import viewUtilities from '../../../src/utilities/viewUtilities'

describe('shape', () => {
	let renderSpy
	let wrappedIndexSpy
	let rotateCoordinatesAboutTileCenterSpy
	let applyZoomAndScrollSpy
	let rotateCoordinatesAboutCanvasCenterSpy

	const tileOrigin = [ 11, 13 ]
	const tileSize = 45
	const tileColors = []
	const colorsIndex = 7
	let getOutline
	const outlineOptions = {}
	let renderTexture

	const transparentColor = { a: 0 }
	const nonTransparentColor = { a: 1 }

	beforeEach(() => {
		renderSpy = jasmine.createSpy()
		shape.__Rewire__('render', renderSpy)
		wrappedIndexSpy = spyOn(codeUtilities, 'wrappedIndex')
		rotateCoordinatesAboutTileCenterSpy = spyOn(componentUtilities, 'rotateCoordinatesAboutTileCenter')
		applyZoomAndScrollSpy = spyOn(viewUtilities, 'applyZoomAndScroll')
		rotateCoordinatesAboutCanvasCenterSpy = spyOn(viewUtilities, 'rotateCoordinatesAboutCanvasCenter')

		getOutline = jasmine.createSpy()
		renderTexture = null
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => {
			getOutline.and.returnValue(null)
		})

		it('returns early, not trying to rotate nothing or render', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColors,
				colorsIndex,
				getOutline,
				outlineOptions,
				renderTexture,
			})


			expect(getOutline).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })

			expect(rotateCoordinatesAboutTileCenterSpy).not.toHaveBeenCalled()
			expect(applyZoomAndScrollSpy).not.toHaveBeenCalled()
			expect(rotateCoordinatesAboutCanvasCenterSpy).not.toHaveBeenCalled()
			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when an outline is received', () => {
		const shapeColor = nonTransparentColor

		const originalOutline = []
		const stepOneOutlineRotatedAboutTileCenter = []
		const stepTwoOutlineZoomedAndScrolled = []
		const stepThreeOutlineRotatedAboutCanvasCenter = []

		beforeEach(() => {
			rotateCoordinatesAboutTileCenterSpy.and.returnValue(stepOneOutlineRotatedAboutTileCenter)
			applyZoomAndScrollSpy.and.returnValue(stepTwoOutlineZoomedAndScrolled)
			rotateCoordinatesAboutCanvasCenterSpy.and.returnValue(stepThreeOutlineRotatedAboutCanvasCenter)

			wrappedIndexSpy.and.returnValue(shapeColor)
			getOutline.and.returnValue(originalOutline)
		})

		it('rotates the outline', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColors,
				colorsIndex,
				getOutline,
				outlineOptions,
				renderTexture,
			})

			expect(getOutline).toHaveBeenCalledWith({
				tileOrigin,
				tileSize,
				outlineOptions,
			})
			expect(rotateCoordinatesAboutTileCenterSpy).toHaveBeenCalledWith({
				coordinates: originalOutline,
				tileOrigin,
				tileSize,
			})
			expect(applyZoomAndScrollSpy).toHaveBeenCalledWith({
				coordinates: stepOneOutlineRotatedAboutTileCenter,
			})
			expect(rotateCoordinatesAboutCanvasCenterSpy).toHaveBeenCalledWith({
				coordinates: stepTwoOutlineZoomedAndScrolled,
			})
		})

		describe('when a renderTexture method is supplied', () => {
			beforeEach(() => renderTexture = () => {
			})

			it('passes it to the texture component to be rendered', () => {
				const textureSpy = jasmine.createSpy()
				shape.__Rewire__('texture', textureSpy)

				shape({
					tileOrigin,
					tileSize,
					tileColors,
					colorsIndex,
					getOutline,
					outlineOptions,
					renderTexture,
				})

				expect(textureSpy).toHaveBeenCalledWith({
					outline: stepThreeOutlineRotatedAboutCanvasCenter,
					tileColors,
					tileOrigin,
					tileSize,
					colorsIndex,
					renderTexture,
				})

				shape.__ResetDependency__('texture')
			})
		})

		describe('when a renderTexture method is not supplied', () => {
			it('assumes the shape is a solid color, and looks for the color in the tile colors using the colors index', () => {
				shape({
					tileOrigin,
					tileSize,
					tileColors,
					colorsIndex,
					getOutline,
					outlineOptions,
					renderTexture,
				})

				expect(wrappedIndexSpy).toHaveBeenCalledWith({ array: tileColors, index: colorsIndex })
			})

			describe('when the color is not completely transparent', () => {
				it('renders', () => {
					shape({
						tileOrigin,
						tileSize,
						tileColors,
						colorsIndex,
						getOutline,
						outlineOptions,
						renderTexture,
					})

					expect(renderSpy).toHaveBeenCalledWith({
						shapeColor,
						outline: stepThreeOutlineRotatedAboutCanvasCenter,
					})
				})
			})

			describe('when the color turns out to be completely transparent', () => {
				beforeEach(() => {
					wrappedIndexSpy.and.returnValue(transparentColor)
				})

				it('does not render', () => {
					shape({
						tileOrigin,
						tileSize,
						tileColors,
						colorsIndex,
						getOutline,
						outlineOptions,
						renderTexture,
					})

					expect(renderSpy).not.toHaveBeenCalled()
				})
			})
		})
	})

	afterEach(() => {
		shape.__ResetDependency__('render')
	})
})
