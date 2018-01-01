import { applyZoom, Path, patternState, to } from '../../../../../src/indexForTest'

describe('apply zoom', () => {
	let subject: (_: Path) => Path
	let path: Path
	beforeEach(() => {
		subject = applyZoom.default
		path = to.Path([
			[ 50, 50 ],
			[ 100, 50 ],
			[ 100, 100 ],
			[ 50, 100 ],
		])
	})

	it('adjusts the path per the zoom level', () => {
		patternState.viewSettings.zoom = 2
		expect(subject(path)).toEqual(to.Path([
			[ 100, 100 ],
			[ 200, 100 ],
			[ 200, 200 ],
			[ 100, 200 ],
		]))
	})

	it('returns the path unchanged if the zoom level is 1', () => {
		patternState.viewSettings.zoom = 1
		expect(subject(path)).toBe(path)
	})
})
