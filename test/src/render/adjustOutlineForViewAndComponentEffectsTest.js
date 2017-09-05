import adjustOutlineForViewAndComponentEffects from '../../../src/render/adjustOutlineForViewAndComponentEffects'
import viewUtilities from '../../../src/utilities/viewUtilities'
import componentUtilities from '../../../src/utilities/componentUtilities'

describe('adjust outline for view and component effects', () => {
	it('applies any relevant outline adjustments including base stripe diagonal, zoom, scroll, and rotation', () => {
		const tileOrigin = []
		const tileSize = 45

		const outline = []
		const baseStripeDiagonalAdjustedOutline = []
		const zoomedAndScrolledOutline = []
		const rotatedOutline = []

		spyOn(componentUtilities, 'adjustForBaseStripeDiagonal').and.returnValue(baseStripeDiagonalAdjustedOutline)
		spyOn(viewUtilities, 'applyZoomAndScroll').and.returnValue(zoomedAndScrolledOutline)
		spyOn(viewUtilities, 'rotateOutlineAboutCanvasCenter').and.returnValue(rotatedOutline)
		const actualOutline = adjustOutlineForViewAndComponentEffects(outline, { tileOrigin, tileSize })

		expect(componentUtilities.adjustForBaseStripeDiagonal).toHaveBeenCalledWith({ coordinates: outline, tileOrigin, tileSize })
		expect(viewUtilities.applyZoomAndScroll).toHaveBeenCalledWith(baseStripeDiagonalAdjustedOutline)
		expect(viewUtilities.rotateOutlineAboutCanvasCenter).toHaveBeenCalledWith(zoomedAndScrolledOutline)
		expect(actualOutline).toBe(rotatedOutline)
	})
})
