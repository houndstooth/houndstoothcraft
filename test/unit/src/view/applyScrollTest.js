import state from '../../../../src/state'
import applyScroll from '../../../../src/view/applyScroll'

describe('apply scroll', () => {
	const zoom = 10
	const tileSize = 40
	const canvasSize = 200
	const outline = [
		[ 3, 5 ],
		[ 4, 5 ],
		[ 3, 4 ],
	]
	beforeEach(() => {
		state.mainHoundstooth.basePattern.viewSettings = { zoom, canvasSize }
		state.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting: tileSize }
	})

	it('can center the view on the center of the tile at grid address [ 0, 0 ]', () => {
		state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtHomeAddress = true

		expect(applyScroll(outline)).toEqual([
			[
				3 + canvasSize / 2 - tileSize / 2,
				5 + canvasSize / 2 - tileSize / 2,
			],
			[
				4 + canvasSize / 2 - tileSize / 2,
				5 + canvasSize / 2 - tileSize / 2,
			],
			[
				3 + canvasSize / 2 - tileSize / 2,
				4 + canvasSize / 2 - tileSize / 2,
			],
		])
	})

	it('returns the outline unchanged if not centering the view on the center of the tile at grid address [ 0, 0 ]', () => {
		state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtHomeAddress = false

		expect(applyScroll(outline)).toEqual(outline)
	})
})
