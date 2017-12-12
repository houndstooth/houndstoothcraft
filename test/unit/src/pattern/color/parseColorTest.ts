import { Color, parseColor } from '../../../../../src/indexForTest'

describe('parse color', () => {
	it('converts a color object into a canvas-readable string', () => {
		const subject: (_: Color) => string = parseColor.default
		const colorObject: Color = { r: 150, g: 100, b: 50, a: 0.5 }
		const expectedParsedColor: string = 'rgba(150,100,50,0.5)'
		expect(subject(colorObject)).toBe(expectedParsedColor)
	})
})
