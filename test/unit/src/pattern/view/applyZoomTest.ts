import { applyZoom, Path, patternState, to } from '../../../../../src/indexForTest'

describe('apply zoom', () => {
	let subject: (_: Path) => Path
	const zoom: number = 2
	let path: Path
	beforeEach(() => {
		subject = applyZoom.default
		path = to.Path([
			[ 50, 50 ],
			[ 100, 50 ],
			[ 100, 100 ],
			[ 50, 100 ],
		])
		patternState.viewSettings.zoom = zoom
	})

	it('adjusts the path per the zoom level', () => {
		expect(subject(path)).toEqual(to.Path([
			[ 100, 100 ],
			[ 200, 100 ],
			[ 200, 200 ],
			[ 100, 200 ],
		]))
	})

	describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
		beforeEach(() => {
			patternState.viewSettings.zoomOnCanvasCenter = true
			path = to.Path([
				[ 350, 350 ],
				[ 400, 350 ],
				[ 400, 400 ],
				[ 350, 400 ],
			])
		})

		it('works', () => {
			expect(subject(path)).toEqual(to.Path([
				[ 300, 300 ],
				[ 400, 300 ],
				[ 400, 400 ],
				[ 300, 400 ],
			]))
		})

		describe('when the view is already centered', () => {
			beforeEach(() => {
				patternState.viewSettings.centerViewOnCenterOfTileAtHomeAddress = true
			})
		})

		it('does not double-up on adjusting for centering the view', () => {
			expect(subject(path)).toEqual(to.Path([
				[ 300, 300 ],
				[ 400, 300 ],
				[ 400, 400 ],
				[ 300, 400 ],
			]))
		})
	})
})
