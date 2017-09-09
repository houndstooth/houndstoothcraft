import shape from '../../../src/render/shape'
import codeUtilities from '../../../src/utilities/codeUtilities'
import store from '../../../store'
import resetStore from '../../../src/store/resetStore'
import display from '../../../src/display'

describe('shape', () => {
	let renderSpy
	let wrappedIndexSpy

	const tileOrigin = [ 11, 13 ]
	const tileSize = 45
	const tileColorIndices = []
	const stripeIndex = 7
	const shapeColorIndex = 45
	let getOutline
	const outlineOptions = {}

	const context = {}

	let getCurrentContextSpy

	beforeEach(() => {
		resetStore(store)
		renderSpy = jasmine.createSpy()
		shape.__Rewire__('render', renderSpy)
		wrappedIndexSpy = spyOn(codeUtilities, 'wrappedIndex').and.returnValue(shapeColorIndex)

		getOutline = jasmine.createSpy()

		getCurrentContextSpy = spyOn(display, 'getCurrentContext').and.returnValue(context)
	})

	describe('when no outline is returned from the get outline function', () => {
		beforeEach(() => {
			getOutline.and.returnValue(null)
		})

		it('returns early, not rendering', () => {
			shape({
				tileOrigin,
				tileSize,
				tileColorIndices,
				stripeIndex,
				getOutline,
				outlineOptions,
			})


			expect(getOutline).toHaveBeenCalledWith({ tileOrigin, tileSize, outlineOptions })

			expect(renderSpy).not.toHaveBeenCalled()
		})
	})

	describe('when an outline is received', () => {
		const outline = []

		let solidSpy

		beforeEach(() => {
			getOutline.and.returnValue(outline)

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

			expect(getCurrentContextSpy).toHaveBeenCalled()
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
					outline,
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

				expect(solidSpy).toHaveBeenCalledWith(
					jasmine.objectContaining({
						context,
						shapeColorIndex,
						outline,
						tileSize,
						tileOrigin,
					})
				)

				shape.__ResetDependency__('texture')
			})
		})
	})

	afterEach(() => {
		shape.__ResetDependency__('render')
	})
})
