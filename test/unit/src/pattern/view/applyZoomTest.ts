import { applyZoom, Path, to } from '../../../../../src'
import { setPatternSettingForTest } from '../../../helpers'

const subject: (_: Path) => Path = applyZoom.default

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
		setPatternSettingForTest('zoom', zoom)
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
			setPatternSettingForTest('zoomOnCanvasCenter', true)
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
				setPatternSettingForTest('centerViewOnCenterOfTileAtHomeAddress', true)
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
