import colorUtilities from '../../src/utilities/colorUtilities'

describe('color utilities', () => {
	describe('#getColorsForTile', () => {

	})

	describe('#parseColor', () => {
		it('converts a color object into a canvas-readable string', () => {
			const colorObject = { r: 150, g: 100, b: 50, a: 0.5 }
			const expectedColorString = 'rgba(150,100,50,0.5)'
			expect(colorUtilities.parseColor(colorObject)).toBe(expectedColorString)
		})
	})

	describe('#allColorsAreTheSame', () => {
		it('returns true if all the colors in the list are the same', () => {
			const colors = [
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 }
			]
			expect(colorUtilities.allColorsAreTheSame(colors)).toBe(true)
		})

		it('returns false if any of the colors in the list are different', () => {
			const colors = [
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 101, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 50, a: 0.5 }
			]
			expect(colorUtilities.allColorsAreTheSame(colors)).toBe(false)
		})

		it('returns false if all of the colors in the list are different', () => {
			const colors = [
				{ r: 153, g: 100, b: 50, a: 0.5 },
				{ r: 150, g: 100, b: 52, a: 0.5 },
				{ r: 150, g: 144, b: 50, a: 0.7 },
				{ r: 151, g: 101, b: 50, a: 0.5 },
				{ r: 150, g: 104, b: 50, a: 0.6 }
			]
			expect(colorUtilities.allColorsAreTheSame(colors)).toBe(false)
		})
	})
})
