import { applyTilt, Path, patternState, to } from '../../../../../src/indexForTest'
import { pixelsAreClose } from '../../../helpers'

describe('apply tilt', () => {
	let subject: (_: Path) => Path
	beforeEach(() => {
		subject = applyTilt.default
	})

	it('rotates the path about the canvas center', () => {
		patternState.viewSettings.rotationAboutCanvasCenter = to.Radian(Math.PI / 2)
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

	it('does nothing if the rotation about the canvas center is undefined or 0', () => {
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
