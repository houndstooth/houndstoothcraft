import state from '../../../../src/state'
import applyScroll from '../../../../src/view/applyScroll'
import Outline from '../../../../src/space/types/Outline'
import CanvasSize from '../../../../src/canvas/types/CanvasSize'

describe('apply scroll', () => {
	const zoom = 10
	const tileSize = 40
	const canvasSize = 200 as CanvasSize
	const outline = [
		[ 3, 5 ],
		[ 4, 5 ],
		[ 3, 4 ],
	] as Outline
	beforeEach(() => {
		state.mainHoundstooth.basePattern.viewSettings = { zoom, canvasSize }
		state.mainHoundstooth.basePattern.tileSettings = { tileSizeSetting: tileSize }
	})

	it('can center the view on the center of the tile at grid address [ 0, 0 ]', () => {
		state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtHomeAddress = true
		const halfCanvasSize = canvasSize as number / 2
		const halfTileSize = tileSize / 2
		expect(applyScroll(outline)).toEqual([
			[
				3 + halfCanvasSize - halfTileSize,
				5 + halfCanvasSize - halfTileSize,
			],
			[
				4 + halfCanvasSize - halfTileSize,
				5 + halfCanvasSize - halfTileSize,
			],
			[
				3 + halfCanvasSize - halfTileSize,
				4 + halfCanvasSize - halfTileSize,
			],
		] as Outline)
	})

	// tslint:disable-next-line:max-line-length
	it('returns the outline unchanged if not centering the view on the center of the tile at grid address [ 0, 0 ]', () => {
		state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtHomeAddress = false

		expect(applyScroll(outline)).toEqual(outline)
	})
})
