import { state } from '../../../../src/state'
import { setSetting } from '../../../../src/store/setSetting'
import * as from from '../../../../src/utilities/from'
import * as to from '../../../../src/utilities/to'
import { applyScroll } from '../../../../src/view/applyScroll'

describe('apply scroll', () => {
	const zoom = 10
	const tileSize = to.Unit(40)
	const canvasSize = to.Dimension(200)
	const outline = to.Outline([
		[ 3, 5 ],
		[ 4, 5 ],
		[ 3, 4 ],
	])
	beforeEach(() => {
		state.mainHoundstooth.basePattern.viewSettings = { zoom, canvasSize }
		state.mainHoundstooth.basePattern.tileSettings = { tileSize }
	})

	it('can center the view on the center of the tile at grid address [ 0, 0 ]', () => {
		setSetting('centerViewOnCenterOfTileAtHomeAddress', true)
		const halfCanvasSize = from.Dimension(canvasSize) / 2
		const halfTileSize = from.Unit(tileSize) / 2
		expect(applyScroll(outline)).toEqual(to.Outline([
			[
				halfCanvasSize - halfTileSize + 3,
				halfCanvasSize - halfTileSize + 5,
			],
			[
				halfCanvasSize - halfTileSize + 4,
				halfCanvasSize - halfTileSize + 5,
			],
			[
				halfCanvasSize - halfTileSize + 3,
				halfCanvasSize - halfTileSize + 4,
			],
		]))
	})

	// tslint:disable-next-line:max-line-length
	it('returns the outline unchanged if not centering the view on the center of the tile at grid address [ 0, 0 ]', () => {
		setSetting('centerViewOnCenterOfTileAtHomeAddress', false)

		expect(applyScroll(outline)).toEqual(outline)
	})
})
