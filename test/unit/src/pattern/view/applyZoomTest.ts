import { Px } from '../../../../../src/app/page'
import { Path } from '../../../../../src/app/render'
import { setSetting } from '../../../../../src/app/store/setSetting'
import { applyZoom } from '../../../../../src/pattern/view/applyZoom'
import * as to from '../../../../../src/to'

describe('apply zoom', () => {
	const zoom: number = 2
	const canvasSize: Px = to.Px(200)
	let path: Path
	beforeEach(() => {
		path = to.Path([
			[ 50, 50 ],
			[ 100, 50 ],
			[ 100, 100 ],
			[ 50, 100 ],
		])
		setSetting('viewSettings', { zoom, canvasSize })
	})

	it('adjusts the path per the zoom level', () => {
		expect(applyZoom(path)).toEqual(to.Path([
			[ 100, 100 ],
			[ 200, 100 ],
			[ 200, 200 ],
			[ 100, 200 ],
		]))
	})

	describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
		beforeEach(() => {
			setSetting('zoomOnCanvasCenter', true)
		})

		it('works', () => {
			expect(applyZoom(path)).toEqual(to.Path([
				[ 0, 0 ],
				[ 100, 0 ],
				[ 100, 100 ],
				[ 0, 100 ],
			]))
		})

		describe('when the view is already centered', () => {
			beforeEach(() => {
				setSetting('centerViewOnCenterOfTileAtHomeAddress', true)
			})
		})

		it('does not double-up on adjusting for centering the view', () => {
			expect(applyZoom(path)).toEqual(to.Path([
				[ 0, 0 ],
				[ 100, 0 ],
				[ 100, 100 ],
				[ 0, 100 ],
			]))
		})
	})
})
