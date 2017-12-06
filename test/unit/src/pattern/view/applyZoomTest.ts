import { applyZoom, Path, setSetting, to } from '../../../../../src'

xdescribe('apply zoom', () => {
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
		})

		it('works', () => {
			expect(applyZoom.default(path)).toEqual(to.Path([
				[ 0, 0 ],
				[ 100, 0 ],
				[ 100, 100 ],
				[ 0, 100 ],
			]))
		})

		describe('when the view is already centered', () => {
			beforeEach(() => {
				setSetting.default('centerViewOnCenterOfTileAtHomeAddress', true)
			})
		})

		it('does not double-up on adjusting for centering the view', () => {
			expect(applyZoom.default(path)).toEqual(to.Path([
				[ 0, 0 ],
				[ 100, 0 ],
				[ 100, 100 ],
				[ 0, 100 ],
			]))
		})
	})
})
