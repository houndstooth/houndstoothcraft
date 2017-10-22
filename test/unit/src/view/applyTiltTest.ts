import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'
import { applyTilt } from '../../../../src/view/applyTilt'
import { coordinatesMatch } from '../../helpers/coordinatesMatch'

describe('apply tilt', () => {
	const canvasSize = to.Dimension(200)

	it('rotates the outline about the canvas center', () => {
		state.mainHoundstooth.basePattern.viewSettings = {
			canvasSize,
			rotateViewAboutCanvasCenter: to.Radian(Math.PI / 2),
		}
		const outline = to.Outline([
			[ 0, 0 ],
			[ 40, 0 ],
			[ 0, 40 ],
		])

		const actualOutline = applyTilt(outline)

		const expectedOutline = to.Outline([
			[ 200, 0 ],
			[ 200, 40 ],
			[ 160, 0 ],
		])
		expect(coordinatesMatch(expectedOutline, actualOutline)).toBe(true)
	})

	it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
		const outline = to.Outline([
			[ 0, 0 ],
			[ 0, 40 ],
			[ 40, 40 ],
		])

		const actualOutline = applyTilt(outline)

		expect(actualOutline).toEqual(outline)
		expect(actualOutline).toBe(outline)
	})
})
