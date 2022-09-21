import { appState, BLACK, executeEffect, to, TRANSPARENT } from '../../../../src/indexForTest'
import { StandardTileExpectation, standardTileIsColors } from '../../helpers'

describe('.tileSettings', () => {
	describe('.tileSize', () => {
		it('adjusts the size in pixels of each tile', (done: DoneFn) => {
			appState.settings.overrides = {
				basePattern: {
					tileSettings: {
						tileSize: to.Unit(30),
					},
				},
			}

			executeEffect.default()

			setTimeout(() => {
				let baseId: number = -8
				const tiles: StandardTileExpectation[] = [
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, BLACK ],
						tileOrigin: to.Coordinate([ 0, 0 ]),
						tileSize: to.Unit(30),
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, BLACK ],
						tileOrigin: to.Coordinate([ 0, 30 ]),
						tileSize: to.Unit(30),
					},
					{
						baseId: baseId += 8,
						colors: [ TRANSPARENT, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 30, 0 ]),
						tileSize: to.Unit(30),
					},
					{
						baseId: baseId += 8,
						colors: [ BLACK, TRANSPARENT ],
						tileOrigin: to.Coordinate([ 30, 30 ]),
						tileSize: to.Unit(30),
					},
				]
				tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

				done()
			},         0)
		})

		describe('when also zooming', () => {
			it('multiplies the effect of taking up more pixels', (done: DoneFn) => {
				appState.settings.overrides = {
					basePattern: {
						tileSettings: {
							tileSize: to.Unit(30),
						},
						viewSettings: {
							zoom: 3,
						},
					},
				}

				executeEffect.default()

				setTimeout(() => {
					let baseId: number = -8
					const tiles: StandardTileExpectation[] = [
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, BLACK ],
							tileOrigin: to.Coordinate([ 0, 0 ]),
							tileSize: to.Unit(90),
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, BLACK ],
							tileOrigin: to.Coordinate([ 0, 90 ]),
							tileSize: to.Unit(90),
						},
						{
							baseId: baseId += 8,
							colors: [ TRANSPARENT, TRANSPARENT ],
							tileOrigin: to.Coordinate([ 90, 0 ]),
							tileSize: to.Unit(90),
						},
						{
							baseId: baseId += 8,
							colors: [ BLACK, TRANSPARENT ],
							tileOrigin: to.Coordinate([ 90, 90 ]),
							tileSize: to.Unit(90),
						},
					]
					tiles.forEach((tile: StandardTileExpectation) => expect(standardTileIsColors(tile)).toBe(true))

					done()
				},         0)
			})
		})
	})

	xdescribe('.collapseSameColoredShapesWithinTile', () => {
		// Instead, test this by looking at pixels on the seam.
	})
})
