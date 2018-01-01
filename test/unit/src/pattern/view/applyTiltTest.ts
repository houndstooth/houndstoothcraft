import { applyTilt, Path, patternState, to } from '../../../../../src/indexForTest'
import { pixelsAreClose } from '../../../helpers'

describe('apply tilt', () => {
	let subject: (_: Path) => Path
	let path: Path
	beforeEach(() => {
		subject = applyTilt.default
		path = to.Path([
			[ 0, 0 ],
			[ 40, 0 ],
			[ 0, 40 ],
		])
	})

	it('rotates the path about the origin', () => {
		patternState.viewSettings.tilt = to.Radian(Math.PI / 2)

		const actualPath: Path = subject(path)

		const expectedPath: Path = to.Path([
			[ 0, 0 ],
			[ 0, 40 ],
			[ -40, 0 ],
		])
		expect(pixelsAreClose(expectedPath, actualPath)).toBe(true)
	})

	it('does nothing if the rotation about the canvas center is undefined or 0', () => {
		expect(subject(path)).toBe(path)
	})
})
