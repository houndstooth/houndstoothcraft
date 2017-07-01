import gridUtilities from '../../src/utilities/gridUtilities'

describe('grid utilities', () => {
	it('can use a supertile-based assignment scheme and a tile\'s address to choose the tile\'s set from the overall grid set', () => {
		const address = [ 3, 5 ]
		const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
		const expectedSupertileEntry = [ 2, 3, 0, 1 ]
		const expectedSetForTile = [ 'THIRD', 'FIRST', 'FIRST', 'SECOND' ]
		const config = {
			set: setForGrid,
			assignment: {
				mode: 'SUPERTILE',
				supertile: [
					[ [], expectedSupertileEntry ],
					[ [], [] ],
					[ [], [] ]
				]
			}
		}

		expect(gridUtilities.getSetForTile({ address, config })).toEqual(expectedSetForTile)
	})

	it('can use a weave-based assignment scheme and a tile\'s address to choose the tile\'s set from the overall grid set', () => {
		const address = [ 3, 5 ]
		const setForGrid = [ 'FIRST', 'SECOND', 'THIRD' ]
		const expectedSetForTile = [ 'FIRST', 'SECOND' ]
		const config = {
			set: setForGrid,
			assignment: {
				mode: 'WEAVE',
				weave: { 
					columns: [ undefined, 1 ],
					rows: [ undefined, undefined, 3 ]
				}
			}
		}

		expect(gridUtilities.getSetForTile({ address, config })).toEqual(expectedSetForTile)
	})

	xit('defaults to a basic weave', () => {})
})