import { applyZoom, Path, setSetting, to } from '../../../../../src'

describe('apply zoom', () => {
	const zoom: number = 2
	let path: Path
	beforeEach(() => {
		path = to.Path([
			[ 50, 50 ],
			[ 100, 50 ],
			[ 100, 100 ],
			[ 50, 100 ],
		])
		setSetting.default('zoom', zoom)
	})

	it('adjusts the path per the zoom level', () => {
		expect(applyZoom.default(path)).toEqual(to.Path([
			[ 100, 100 ],
			[ 200, 100 ],
			[ 200, 200 ],
			[ 100, 200 ],
		]))
	})

	describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
		beforeEach(() => {
			setSetting.default('zoomOnCanvasCenter', true)
			path = to.Path([
				[ 350, 350 ],
				[ 400, 350 ],
				[ 400, 400 ],
				[ 350, 400 ],
			])
		})

		it('works', () => {
			expect(applyZoom.default(path)).toEqual(to.Path([
				[ 300, 300 ],
				[ 400, 300 ],
				[ 400, 400 ],
				[ 300, 400 ],
			]))
		})

		describe('when the view is already centered', () => {
			beforeEach(() => {
				setSetting.default('centerViewOnCenterOfTileAtHomeAddress', true)
			})
		})

		it('does not double-up on adjusting for centering the view', () => {
			expect(applyZoom.default(path)).toEqual(to.Path([
				[ 300, 300 ],
				[ 400, 300 ],
				[ 400, 400 ],
				[ 300, 400 ],
			]))
		})
	})
})
