import CanvasSize from '../../../../src/canvas/types/CanvasSize'
import Outline from '../../../../src/space/types/Outline'
import state from '../../../../src/state'
import applyScroll from '../../../../src/view/applyScroll'

describe('apply scroll', () => {
	const zoom = 10
	const tileSize = 40 as any
	const canvasSize = 200 as CanvasSize
	const outline = [
		[ 3 as any, 5 as any ],
		[ 4 as any, 5 as any ],
		[ 3 as any, 4 as any ],
	] as Outline
	beforeEach(() => {
		const basePattern = state.mainHoundstooth.basePattern || {}
		basePattern.viewSettings = { zoom, canvasSize }
		basePattern.tileSettings = { tileSizeSetting: tileSize }
	})

	it('can center the view on the center of the tile at grid address [ 0, 0 ]', () => {
		const basePattern = state.mainHoundstooth.basePattern || {}
		const viewSettings = basePattern.viewSettings || {}
		viewSettings.centerViewOnCenterOfTileAtHomeAddress = true
		const halfCanvasSize = canvasSize as number / 2
		const halfTileSize = tileSize / 2
		expect(applyScroll(outline)).toEqual([
			[
				3 + halfCanvasSize - halfTileSize as any,
				5 + halfCanvasSize - halfTileSize as any,
			],
			[
				4 + halfCanvasSize - halfTileSize as any,
				5 + halfCanvasSize - halfTileSize as any,
			],
			[
				3 + halfCanvasSize - halfTileSize as any,
				4 + halfCanvasSize - halfTileSize as any,
			],
		] as Outline)
	})

	// tslint:disable-next-line:max-line-length
	it('returns the outline unchanged if not centering the view on the center of the tile at grid address [ 0, 0 ]', () => {
		const basePattern = state.mainHoundstooth.basePattern || {}
		const viewSettings = basePattern.viewSettings || {}
		viewSettings.centerViewOnCenterOfTileAtHomeAddress = false

		expect(applyScroll(outline)).toEqual(outline)
	})
})
