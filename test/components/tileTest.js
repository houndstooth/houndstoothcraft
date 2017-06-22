import 'jasmine'

import tile from '../../components/tile'
import transpositionUtilities from '../../utilities/transpositionUtilities'
import colorUtilities from '../../utilities/colorUtilities'

describe('tile', () => {
	const address = [ 3, 5 ]

	describe('when the tile is not assigned an origin on the canvas', () => {
		beforeEach(() => {
			spyOn(transpositionUtilities, 'getTileOriginAndSizedUnit').and.returnValue({ tileOrigin: null, sizedUnit: 10 })
			spyOn(colorUtilities, 'getColorsForTile')
		})

		it('returns early, not getting colors', () => {
			tile({ address })

			expect(colorUtilities.getColorsForTile.notCalled)
		})
	})
})
