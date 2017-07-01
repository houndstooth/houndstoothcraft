import codeUtilities from '../../src/utilities/codeUtilities'

describe('code utilities', () => {
	describe('iterator', () => {
		let iterator
		beforeEach(() => iterator = codeUtilities.iterator )

    	it('returns an array of integers counting up', () => {
    		expect(iterator(5)).toEqual([ 0, 1, 2, 3, 4 ])
    	})

    	it('can be one indexed', () => {
    		const result = iterator(5, { oneIndexed: true })
    		expect(result).toEqual([ 1, 2, 3, 4, 5 ])
    	})
	})

	describe('wrapped index', () => {
		let wrappedIndex, index
		const array = [ 'a', 'b', 'c' ]
		beforeEach(() => wrappedIndex = codeUtilities.wrappedIndex )

		it('returns the element of the array at the given index', () => {
			index = 1
			expect(wrappedIndex({ array, index })).toBe('b')
		})

		it('loops the index around if it is greater than the length of the array', () => {
			index = 4
			expect(wrappedIndex({ array, index })).toBe('b')
		})

		it('works with negative indices', () => {
			index = -4
			expect(wrappedIndex({ array, index })).toBe('c')
		})

		it('works with negative indices whose absolute value is equal to the length of the array', () => {
			index = -3
			expect(wrappedIndex({ array, index })).toBe('a')
		})

		it('defaults the index to 0', () => {
			index = undefined
			expect(wrappedIndex({ array, index })).toBe('a')
		})
	})
})
