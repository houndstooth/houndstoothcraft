import CanvasSize from '../../../../src/canvas/types/CanvasSize'
import Outline from '../../../../src/space/types/Outline'
import state from '../../../../src/state'
import applyTilt from '../../../../src/view/applyTilt'
import coordinatesMatch from '../../helpers/coordinatesMatch'

describe('apply tilt', () => {
	const canvasSize = 200 as CanvasSize

	it('rotates the outline about the canvas center', () => {
		const basePattern = state.mainHoundstooth.basePattern || {}
		basePattern.viewSettings = {
			canvasSize,
			rotateViewAboutCanvasCenter: Math.PI / 2 as any,
		}
		const outline = [
			[ 0 as any, 0 as any ],
			[ 40 as any, 0 as any ],
			[ 0 as any, 40 as any ],
		] as Outline

		const actualOutline = applyTilt(outline)

		const expectedOutline = [
			[ 200 as any, 0 as any ],
			[ 200 as any, 40 as any ],
			[ 160 as any, 0 as any ],
		] as Outline
		expect(coordinatesMatch(expectedOutline, actualOutline)).toBe(true)
	})

	it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
		const outline = [
			[ 0 as any, 0 as any ],
			[ 0 as any, 40 as any ],
			[ 40 as any, 40 as any ],
		] as Outline

		const actualOutline = applyTilt(outline)

		expect(actualOutline).toEqual(outline)
		expect(actualOutline).toBe(outline)
	})
})
