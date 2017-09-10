import coordinatesMatch from '../helpers/coordinatesMatch'
import state from '../../../state'
import resetState from '../../../src/store/resetState'
import applyTilt from '../../../src/view/applyTilt'

describe('apply tilt', () => {
	const canvasSize = 200
	beforeEach(() => resetState(state))

	it('rotates the outline about the canvas center', () => {
		state.mainHoundstooth.basePattern.viewSettings = {
			rotateViewAboutCanvasCenter: Math.PI / 2,
			canvasSize,
		}
		const outline = [
			[ 0, 0 ],
			[ 40, 0 ],
			[ 0, 40 ],
		]

		const actualOutline = applyTilt(outline)

		const expectedOutline = [
			[ 200, 0 ],
			[ 200, 40 ],
			[ 160, 0 ],
		]
		expect(coordinatesMatch(expectedOutline, actualOutline)).toBe(true)
	})

	it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
		const outline = [
			[ 0, 0 ],
			[ 0, 40 ],
			[ 40, 40 ],
		]

		const actualOutline = applyTilt(outline)

		expect(actualOutline).toEqual(outline)
		expect(actualOutline).toBe(outline)
	})
})
