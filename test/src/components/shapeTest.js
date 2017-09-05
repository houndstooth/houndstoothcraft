import shape from '../../../src/components/shape'
import codeUtilities from '../../../src/utilities/codeUtilities'
import componentUtilities from '../../../src/utilities/componentUtilities'
import viewUtilities from '../../../src/utilities/viewUtilities'
import renderUtilities from '../../../src/utilities/renderUtilities'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'

describe('shape', () => {
	let renderSpy
	let wrappedIndexSpy
	let rotateCoordinatesAboutTileCenterSpy
	let applyZoomAndScrollSpy
	let rotateCoordinatesAboutCanvasCenterSpy

	const tileOrigin = [ 11, 13 ]
	const tileSize = 45
	const tileColorIndices = []
	const stripeIndex = 7
	let getOutline
	const outlineOptions = {}

	const context = {}

	beforeEach(() => {
		resetStore(store)
		renderSpy = jasmine.createSpy()
		shape.__Rewire__('render', renderSpy)
		wrappedIndexSpy = spyOn(codeUtilities, 'wrappedIndex')
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

		const originalOutline = []
		const stepOneOutlineRotatedAboutTileCenter = []
		const stepTwoOutlineZoomedAndScrolled = []
		const stepThreeOutlineRotatedAboutCanvasCenter = []

		let solidSpy

		beforeEach(() => {
			rotateCoordinatesAboutTileCenterSpy.and.returnValue(stepOneOutlineRotatedAboutTileCenter)
			applyZoomAndScrollSpy.and.returnValue(stepTwoOutlineZoomedAndScrolled)
			rotateCoordinatesAboutCanvasCenterSpy.and.returnValue(stepThreeOutlineRotatedAboutCanvasCenter)

			wrappedIndexSpy.and.returnValue(shapeColorIndex)
			getOutline.and.returnValue(originalOutline)

			solidSpy = jasmine.createSpy()
			shape.__Rewire__('solid', solidSpy)
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

		it('gets the current context', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColorIndices,
				stripeIndex,
				getOutline,
				outlineOptions,
			})

			expect(renderUtilities.getCurrentContext).toHaveBeenCalled()
		})

		it('gets the index of the color in the central set, from the array of such indicies for the tile, using the stripe index', () => {
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
		})

		describe('when a renderTexture method is supplied', () => {
			const renderTexture = () => {}
			beforeEach(() => {
				store.mainHoundstooth.basePattern.textureSettings = { renderTexture }
			})

			it('passes it to the texture component to be rendered', () => {
				const textureSpy = jasmine.createSpy()
				shape.__Rewire__('texture', textureSpy)

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
			it('passes it to the solid component to be rendered', () => {
				shape({
					tileOrigin,
					tileSize,
					tileColorIndices,
					stripeIndex,
					getOutline,
					outlineOptions,
				})

				expect(solidSpy).toHaveBeenCalledWith({
					context,
					shapeColorIndex,
					outline: stepThreeOutlineRotatedAboutCanvasCenter,
				})

				shape.__ResetDependency__('texture')
			})
		})
	})

	afterEach(() => {
		shape.__ResetDependency__('render')
	})
})
