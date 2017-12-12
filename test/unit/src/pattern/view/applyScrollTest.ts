import { applyScroll, CANVAS_SIZE, from, Path, patternState, to, Unit } from '../../../../../src/indexForTest'

describe('apply scroll', () => {
	let subject: (_: Path) => Path
	const zoom: number = 10
	let tileSize: Unit
	let path: Path
	beforeEach(() => {
		subject = applyScroll.default
		tileSize = to.Unit(40)
		path = to.Path([
			[ 3, 5 ],
			[ 4, 5 ],
			[ 3, 4 ],
		])

		patternState.viewSettings.zoom = zoom
		patternState.tileSettings.tileSize = tileSize
	})

	it('can center the view on the center of the tile at grid address [ 0, 0 ]', () => {
		patternState.viewSettings.centerViewOnCenterOfTileAtHomeAddress = true
		const halfCanvasSize: number = from.Px(CANVAS_SIZE) / 2
		const halfTileSize: number = from.Unit(tileSize) / 2
		expect(subject(path)).toEqual(to.Path([
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
		patternState.viewSettings.centerViewOnCenterOfTileAtHomeAddress = false

		expect(subject(path)).toEqual(path)
	})
})
