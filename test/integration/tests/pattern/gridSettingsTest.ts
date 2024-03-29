import {
	appState,
	BLACK,
	CANVAS_SIZE,
	executeEffect,
	from,
	patternState,
	to,
	TRANSPARENT,
	Unit,
	WHITE,
} from '../../../../src/indexForTest'
import { StandardTileExpectation, standardTileIsColors } from '../../helpers'

describe('.gridSettings', () => {
	let tileSize: Unit
	beforeEach(() => {
		tileSize = patternState.tileSettings.tileSize
	})

	describe('.tileResolution', () => {
		it('changes how many tiles there are per dimension', (done: DoneFn) => {
			appState.settings.overrides = {
				basePattern: {
					colorSettings: {
						colorSet: to.ColorSet([ BLACK, WHITE ]),
					},
					gridSettings: {
						tileResolution: 3,
					},
				},
			}

			executeEffect.default()

			setTimeout(() => {
				const tiles: StandardTileExpectation[] = [
					{
						baseId: 0,
						colors: [ WHITE, BLACK ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 0 ]),
						tileSize,
					},
					{
						baseId: 8,
						colors: [ BLACK, BLACK ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 1 ]),
						tileSize,
					},
					{
						baseId: 16,
						colors: [ WHITE, BLACK ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 2 ]),
						tileSize,
					},
					{
						baseId: 24,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 0, from.Unit(tileSize) * 3 ]),
						tileSize,
					},

					{
						baseId: 32,
						colors: [ WHITE, WHITE ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 0 ]),
						tileSize,
					},
					{
						baseId: 40,
						colors: [ BLACK, WHITE ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 1 ]),
						tileSize,
					},
					{
						baseId: 48,
						colors: [ WHITE, WHITE ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 2 ]),
						tileSize,
					},
					{
						baseId: 56,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 1, from.Unit(tileSize) * 3 ]),
						tileSize,
					},

					{
						baseId: 64,
						colors: [ WHITE, BLACK ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 0 ]),
						tileSize,
					},
					{
						baseId: 72,
						colors: [ BLACK, BLACK ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 1 ]),
						tileSize,
					},
					{
						baseId: 80,
						colors: [ WHITE, BLACK ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 2 ]),
						tileSize,
					},
					{
						baseId: 88,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 2, from.Unit(tileSize) * 3 ]),
						tileSize,
					},

					{
						baseId: 96,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 0 ]),
						tileSize,
					},
					{
						baseId: 104,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 1 ]),
						tileSize,
					},
					{
						baseId: 112,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 2 ]),
						tileSize,
					},
					{
						baseId: 120,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ from.Unit(tileSize) * 3, from.Unit(tileSize) * 3 ]),
						tileSize,
					},
				]

				tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

				done()
			},         0)
		})
	})

	describe('.includeNegativeQuadrants', () => {
		// tslint:disable-next-line:max-line-length
		it('quadruples the number of tiles, adding them not only in the positive x positive y quadrant, but negative x positive y, positive x negative y, and negative x negative y', (done: DoneFn) => {
			appState.settings.overrides = {
				basePattern: {
					gridSettings: {
						includeNegativeQuadrants: true,
						tileResolution: 1,
					},
					tileSettings: {
						tileSize,
					},
					viewSettings: {
						scroll: [ to.Px(from.Px(CANVAS_SIZE) / 2), to.Px(from.Px(CANVAS_SIZE) / 2) ],
					},
				},
			}

			executeEffect.default()

			setTimeout(() => {
				const tiles: StandardTileExpectation[] = [
					{
						baseId: 0,
						colors: [ TRANSPARENT, BLACK ],
						tileOrigin: to.Coordinate([ 400, 400 ]),
						tileSize,
					},
					{
						baseId: 8,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 350, 400 ]),
						tileSize,
					},
					{
						baseId: 24,
						colors: [ BLACK, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 350, 350 ]),
						tileSize,
					},
					{
						baseId: 16,
						colors: [ BLACK, BLACK ],
						tileOrigin: to.Coordinate([ 400, 350 ]),
						tileSize,
					},
				]
				tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

				done()
			},         0)
		})
	})
})
