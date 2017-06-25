import 'jasmine'

import tile from '../../src/components/tile'
import transpositionUtilities from '../../src/utilities/transpositionUtilities'
import colorUtilities from '../../src/utilities/colorUtilities'

describe('tile', () => {
	const address = [ 3, 5 ]

	describe('when the tile is not assigned an origin on the canvas', () => {
		beforeEach(() => {
			spyOn(transpositionUtilities, 'getTileOriginAndSizedUnit').and.returnValue({ tileOrigin: null, sizedUnit: 10 })
			spyOn(colorUtilities, 'getColorsForTile')
		})

		it('returns early, not getting colors', () => {
			tile({ address })

			expect(colorUtilities.getColorsForTile).not.toHaveBeenCalled()
		})
	})
})
