import { Outline } from '../../../../src/space/types/Outline'
import { state } from '../../../../src/state'
import { applyZoom } from '../../../../src/view/applyZoom'

describe('apply zoom', () => {
	const zoom = 2
	const canvasSize = 200 as any
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
		expect(applyZoom(outline)).toEqual([
			[ 100 as any, 100 as any ],
			[ 200 as any, 100 as any ],
			[ 200 as any, 200 as any ],
			[ 100 as any, 200 as any ],
		] as Outline)
	})

	describe('zooming on canvas center (instead of the default, the origin [top left corner])', () => {
		beforeEach(() => {
			state.mainHoundstooth.basePattern.viewSettings.zoomOnCanvasCenter = true
		})

		it('works', () => {
			expect(applyZoom(outline)).toEqual([
				[ 0 as any, 0 as any ],
				[ 100 as any, 0 as any ],
				[ 100 as any, 100 as any ],
				[ 0 as any, 100 as any ],
			] as Outline)
		})

		describe('when the view is already centered', () => {
			beforeEach(() => {
				state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtHomeAddress = true
			})
		})

		it('does not double-up on adjusting for centering the view', () => {
			expect(applyZoom(outline)).toEqual([
				[ 0 as any, 0 as any ],
				[ 100 as any, 0 as any ],
				[ 100 as any, 100 as any ],
				[ 0 as any, 100 as any ],
			] as Outline)
		})
	})
})
