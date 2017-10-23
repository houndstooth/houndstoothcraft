import { state } from '../../../../src/state'
import * as to from '../../../../src/utilities/to'
import { applyTilt } from '../../../../src/view/applyTilt'
import { pixelsAreClose } from '../../helpers/pixelsAreClose'

describe('apply tilt', () => {
	const canvasSize = to.Dimension(200)

	it('rotates the path about the canvas center', () => {
		state.mainHoundstooth.basePattern.viewSettings = {
			canvasSize,
			rotateViewAboutCanvasCenter: to.Radian(Math.PI / 2),
		}
		const path = to.Path([
			[ 0, 0 ],
			[ 40, 0 ],
			[ 0, 40 ],
		])

		const actualPath = applyTilt(path)

		const expectedPath = to.Path([
			[ 200, 0 ],
			[ 200, 40 ],
			[ 160, 0 ],
		])
		expect(pixelsAreClose(expectedPath, actualPath)).toBe(true)
	})

	it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
		const path = to.Path([
			[ 0, 0 ],
			[ 0, 40 ],
			[ 40, 40 ],
		])

		const actualPath = applyTilt(path)

		expect(actualPath).toEqual(path)
		expect(actualPath).toBe(path)
	})
})
