import { applyScroll, constants, from, Path, to, Unit } from '../../../../../src'
import { setPatternStateForTest } from '../../../helpers'

const subject: (_: Path) => Path = applyScroll.default

describe('apply scroll', () => {
	const { CANVAS_SIZE } = constants
	const zoom: number = 10
	const tileSize: Unit = to.Unit(40)
	const path: Path = to.Path([
		[ 3, 5 ],
		[ 4, 5 ],
		[ 3, 4 ],
	])
	beforeEach(() => {
		setPatternStateForTest('zoom', zoom)
		setPatternStateForTest('tileSize', tileSize)
	})

	it('can center the view on the center of the tile at grid address [ 0, 0 ]', () => {
		setPatternStateForTest('centerViewOnCenterOfTileAtHomeAddress', true)
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
		setPatternStateForTest('centerViewOnCenterOfTileAtHomeAddress', false)

		expect(subject(path)).toEqual(path)
	})
})
