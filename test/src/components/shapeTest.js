import shape from '../../../src/components/shape'
import codeUtilities from '../../../src/utilities/codeUtilities'
import componentUtilities from '../../../src/utilities/componentUtilities'
import viewUtilities from '../../../src/utilities/viewUtilities'
import renderUtilities from '../../../src/utilities/renderUtilities'
import colorUtilities from '../../../src/utilities/colorUtilities'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('shape', () => {
	let renderSpy
	let wrappedIndexSpy
	let getColorSpy
	let rotateCoordinatesAboutTileCenterSpy
	let applyZoomAndScrollSpy
	let rotateCoordinatesAboutCanvasCenterSpy

	const tileOrigin = [ 11, 13 ]
	const tileSize = 45
	const tileColorIndices = []
	const stripeIndex = 7
	let getOutline
	const outlineOptions = {}

	const transparentColor = { a: 0 }
	const nonTransparentColor = { a: 1 }

	const context = {}

	beforeEach(() => {
		resetStore(store)
		renderSpy = jasmine.createSpy()
		shape.__Rewire__('render', renderSpy)
		wrappedIndexSpy = spyOn(codeUtilities, 'wrappedIndex')
		getColorSpy = spyOn(colorUtilities, 'getColor')
		rotateCoordinatesAboutTileCenterSpy = spyOn(componentUtilities, 'rotateCoordinatesAboutTileCenter')
		applyZoomAndScrollSpy = spyOn(viewUtilities, 'applyZoomAndScroll')
		rotateCoordinatesAboutCanvasCenterSpy = spyOn(viewUtilities, 'rotateCoordinatesAboutCanvasCenter')

		getOutline = jasmine.createSpy()

		spyOn(renderUtilities, 'getCurrentContext').and.returnValue(context)
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => {
			getOutline.and.returnValue(null)
		})

		it('returns early, not trying to rotate anything, nor render', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColorIndices,
				stripeIndex,
				getOutline,
				outlineOptions,
			})


			expect(getOutline).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })

			expect(rotateCoordinatesAboutTileCenterSpy).not.toHaveBeenCalled()
			expect(applyZoomAndScrollSpy).not.toHaveBeenCalled()
			expect(rotateCoordinatesAboutCanvasCenterSpy).not.toHaveBeenCalled()
			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when an outline is received', () => {
		const shapeColorIndex = 45
		const shapeColor = nonTransparentColor

		const originalOutline = []
		const stepOneOutlineRotatedAboutTileCenter = []
		const stepTwoOutlineZoomedAndScrolled = []
		const stepThreeOutlineRotatedAboutCanvasCenter = []

		beforeEach(() => {
			rotateCoordinatesAboutTileCenterSpy.and.returnValue(stepOneOutlineRotatedAboutTileCenter)
			applyZoomAndScrollSpy.and.returnValue(stepTwoOutlineZoomedAndScrolled)
			rotateCoordinatesAboutCanvasCenterSpy.and.returnValue(stepThreeOutlineRotatedAboutCanvasCenter)

			wrappedIndexSpy.and.returnValue(shapeColorIndex)
			getColorSpy.and.returnValue(shapeColor)
			getOutline.and.returnValue(originalOutline)
		})

		it('rotates the outline', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColorIndices,
				stripeIndex,
				getOutline,
				outlineOptions,
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

		describe('when layering', () => {
			it('calls render with the current context', () => {
				const layer = 5
				const expectedContext = {}
				store.mainHoundstooth.basePattern.layerSettings = { endLayer: layer }
				store.currentLayer = layer
				store.contexts = [ {}, {}, {}, {}, {}, expectedContext ]

				shape({
					tileOrigin,
					tileSize,
					tileColorIndices,
					stripeIndex,
					getOutline,
					outlineOptions,
				})

				expect(renderSpy).toHaveBeenCalledWith({
					context: expectedContext,
					shapeColor,
					outline: stepThreeOutlineRotatedAboutCanvasCenter,
				})
			})
		})

		describe('when a renderTexture method is supplied', () => {
			const renderTexture = () => {}
			beforeEach(() => {
				store.mainHoundstooth.basePattern.textureSettings = { renderTexture }
			})

			it('passes it to the texture component to be rendered', () => {
				const textureSpy = jasmine.createSpy()
				shape.__Rewire__('texture', textureSpy)
				const shapeColorIndex = 95
				wrappedIndexSpy.and.returnValue(shapeColorIndex)

				shape({
					tileOrigin,
					tileSize,
					tileColorIndices,
					stripeIndex,
					getOutline,
					outlineOptions,
				})

				expect(textureSpy).toHaveBeenCalledWith({
					context,
					outline: stepThreeOutlineRotatedAboutCanvasCenter,
					tileColorIndices,
					tileOrigin,
					tileSize,
					renderTexture,
					shapeColorIndex,
				})

				shape.__ResetDependency__('texture')
			})
		})

		describe('when a renderTexture method is not supplied', () => {
			it('assumes the shape is a solid color, and looks for the color in the tile colors using the colors index', () => {
				shape({
					tileOrigin,
					tileSize,
					tileColorIndices,
					stripeIndex,
					getOutline,
					outlineOptions,
				})

				expect(wrappedIndexSpy).toHaveBeenCalledWith({
					array: tileColorIndices,
					index: stripeIndex,
				})
				expect(getColorSpy).toHaveBeenCalledWith({ index: shapeColorIndex })
			})

			describe('when the color is not completely transparent', () => {
				it('renders', () => {
					shape({
						tileOrigin,
						tileSize,
						tileColorIndices,
						stripeIndex,
						getOutline,
						outlineOptions,
					})

					expect(renderSpy).toHaveBeenCalledWith({
						context,
						shapeColor,
						outline: stepThreeOutlineRotatedAboutCanvasCenter,
					})
				})
			})

			describe('when the color turns out to be completely transparent', () => {
				beforeEach(() => {
					getColorSpy.and.returnValue(transparentColor)
				})

				it('does not render', () => {
					shape({
						tileOrigin,
						tileSize,
						tileColorIndices,
						stripeIndex,
						getOutline,
						outlineOptions,
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
