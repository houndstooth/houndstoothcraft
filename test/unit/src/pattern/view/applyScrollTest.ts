import { applyScroll, Path, patternState, to } from '../../../../../src/indexForTest'
import { pixelsAreClose } from '../../../helpers'

describe('apply scroll', () => {
	let subject: (_: Path) => Path
	let path: Path
	beforeEach(() => {
		subject = applyScroll.default
		path = to.Path([
			[ 3, 5 ],
			[ 4, 5 ],
			[ 3, 4 ],
		])
	})

	it('scrolls pixels by the scroll amount', () => {
		patternState.viewSettings.scroll = [ to.Px(2), to.Px(8) ]

		const actualPath: Path = subject(path)
		const expectedPath: Path = to.Path([
			[ 5, 13 ],
			[ 6, 13 ],
			[ 5, 12 ],
		])
		expect(pixelsAreClose(expectedPath, actualPath)).toBe(true)
	})

	it('returns the path unchanged when scroll is the origin', () => {
		patternState.viewSettings.scroll = [ to.Px(0), to.Px(0) ]

		expect(subject(path)).toBe(path)
	})
})
