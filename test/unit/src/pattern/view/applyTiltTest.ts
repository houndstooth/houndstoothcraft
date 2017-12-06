import { applyTilt, Path, setSetting, to } from '../../../../../src'
import { pixelsAreClose } from '../../../helpers'

xdescribe('apply tilt', () => {
	it('rotates the path about the canvas center', () => {
		setSetting.default('rotateViewAboutCanvasCenter', to.Radian(Math.PI / 2))
		const path: Path = to.Path([
			[ 0, 0 ],
			[ 40, 0 ],
			[ 0, 40 ],
		])

		const actualPath: Path = applyTilt.default(path)

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

		const actualPath: Path = applyTilt.default(path)

		expect(actualPath).toEqual(path)
		expect(actualPath).toBe(path)
	})
})
