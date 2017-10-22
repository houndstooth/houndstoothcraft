import { state } from '../../../../src/state'
import { getSetting } from '../../../../src/store/getSetting'
import { ViewSettings } from '../../../../src/store/types/settings/ViewSettings'
import * as to from '../../../../src/utilities/to'
import { applyZoom } from '../../../../src/view/applyZoom'

describe('apply zoom', () => {
	const zoom = 2
	const canvasSize = to.Dimension(200)
	let outline
	beforeEach(() => {
		outline = [
			[ 50, 50 ],
			[ 100, 50 ],
			[ 100, 100 ],
			[ 50, 100 ],
		]
		state.mainHoundstooth.basePattern.viewSettings = { zoom, canvasSize }
	})

	it('adjusts the outline per the zoom level', () => {
		expect(applyZoom(outline)).toEqual(to.Outline([
			[ 100, 100 ],
			[ 200, 100 ],
			[ 200, 200 ],
			[ 100, 200 ],
		]))
	})

	describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
		beforeEach(() => {
			const viewSettings: ViewSettings = getSetting('view')
			viewSettings.zoomOnCanvasCenter = true
		})

		it('works', () => {
			expect(applyZoom(outline)).toEqual(to.Outline([
				[ 0, 0 ],
				[ 100, 0 ],
				[ 100, 100 ],
				[ 0, 100 ],
			]))
		})

		describe('when the view is already centered', () => {
			beforeEach(() => {
				const viewSettings: ViewSettings = getSetting('view')
				viewSettings.centerViewOnCenterOfTileAtHomeAddress = true
			})
		})

		it('does not double-up on adjusting for centering the view', () => {
			expect(applyZoom(outline)).toEqual(to.Outline([
				[ 0, 0 ],
				[ 100, 0 ],
				[ 100, 100 ],
				[ 0, 100 ],
			]))
		})
	})
})
