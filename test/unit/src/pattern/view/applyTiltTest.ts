import { applyTilt, Path, to } from '../../../../../src'
import { pixelsAreClose, setPatternStateForTest } from '../../../helpers'

const subject: (_: Path) => Path  = applyTilt.default

describe('apply tilt', () => {
	it('rotates the path about the canvas center', () => {
		setPatternStateForTest('rotateViewAboutCanvasCenter', to.Radian(Math.PI / 2))
		const path: Path = to.Path([
			[ 0, 0 ],
			[ 40, 0 ],
			[ 0, 40 ],
		])

		const actualPath: Path = subject(path)

		const expectedPath: Path = to.Path([
			[ 800, 0 ],
			[ 800, 40 ],
			[ 760, 0 ],
		])
		expect(pixelsAreClose(expectedPath, actualPath)).toBe(true)
	})

	it('does nothing if rotateViewAboutCanvasCenter is undefined or 0', () => {
		const path: Path = to.Path([
			[ 0, 0 ],
			[ 0, 40 ],
			[ 40, 40 ],
		])

		const actualPath: Path = subject(path)

		expect(actualPath).toEqual(path)
		expect(actualPath).toBe(path)
	})
})
