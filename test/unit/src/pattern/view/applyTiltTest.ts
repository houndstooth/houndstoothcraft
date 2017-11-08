import { Px } from '../../../../../src/app/page'
import { Path } from '../../../../../src/app/render'
import { setSetting } from '../../../../../src/app/store/setSetting'
import { applyTilt } from '../../../../../src/pattern/view/applyTilt'
import * as to from '../../../../../src/to'
import { pixelsAreClose } from '../../../helpers/pixelsAreClose'

describe('apply tilt', () => {
	const canvasSize: Px = to.Px(200)

	it('rotates the path about the canvas center', () => {
		setSetting('viewSettings', { canvasSize, rotateViewAboutCanvasCenter: to.Radian(Math.PI / 2) })
		const path: Path = to.Path([
			[ 0, 0 ],
			[ 40, 0 ],
			[ 0, 40 ],
		])

		const actualPath: Path = applyTilt(path)

		const expectedPath: Path = to.Path([
			[ 200, 0 ],
			[ 200, 40 ],
			[ 160, 0 ],
		])
		expect(pixelsAreClose(expectedPath, actualPath)).toBe(true)
	})

	it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
		const path: Path = to.Path([
			[ 0, 0 ],
			[ 0, 40 ],
			[ 40, 40 ],
		])

		const actualPath: Path = applyTilt(path)

		expect(actualPath).toEqual(path)
		expect(actualPath).toBe(path)
	})
})
