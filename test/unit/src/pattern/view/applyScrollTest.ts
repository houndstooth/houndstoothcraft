import { applyScroll, from, Path, Px, setSetting, to, Unit } from '../../../../../src'

describe('apply scroll', () => {
	const zoom: number = 10
	const tileSize: Unit = to.Unit(40)
	const canvasSize: Px = to.Px(200)
	const path: Path = to.Path([
		[ 3, 5 ],
		[ 4, 5 ],
		[ 3, 4 ],
	])
	beforeEach(() => {
		setSetting.main('viewSettings', { zoom, canvasSize })
		setSetting.main('tileSettings', { tileSize })
	})

	it('can center the view on the center of the tile at grid address [ 0, 0 ]', () => {
		setSetting.main('centerViewOnCenterOfTileAtHomeAddress', true)
		const halfCanvasSize: number = from.Px(canvasSize) / 2
		const halfTileSize: number = from.Unit(tileSize) / 2
		expect(applyScroll.main(path)).toEqual(to.Path([
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
	it('returns the path unchanged if not centering the view on the center of the tile at grid address [ 0, 0 ]', () => {
		setSetting.main('centerViewOnCenterOfTileAtHomeAddress', false)

		expect(applyScroll.main(path)).toEqual(path)
	})
})
