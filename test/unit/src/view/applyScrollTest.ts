import { Outline } from '../../../../src/space/types/Outline'
import { state } from '../../../../src/state'
import { applyScroll } from '../../../../src/view/applyScroll'

describe('apply scroll', () => {
	const zoom = 10
	const tileSize = 40 as any
	const canvasSize = 200 as any
	const outline = [
		[ 3 as any, 5 as any ],
		[ 4 as any, 5 as any ],
		[ 3 as any, 4 as any ],
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
				halfCanvasSize - halfTileSize + 3 as any,
				halfCanvasSize - halfTileSize + 5 as any,
			],
			[
				halfCanvasSize - halfTileSize + 4 as any,
				halfCanvasSize - halfTileSize + 5 as any,
			],
			[
				halfCanvasSize - halfTileSize + 3 as any,
				halfCanvasSize - halfTileSize + 4 as any,
			],
		] as Outline)
	})

	// tslint:disable-next-line:max-line-length
	it('returns the outline unchanged if not centering the view on the center of the tile at grid address [ 0, 0 ]', () => {
		state.mainHoundstooth.basePattern.viewSettings.centerViewOnCenterOfTileAtHomeAddress = false

		expect(applyScroll(outline)).toEqual(outline)
	})
})
