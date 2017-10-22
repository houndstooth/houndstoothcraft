import { parseColor } from '../../../../src/render/parseColor'
import * as to from '../../../../src/utilities/to'

describe('parse color', () => {
	it('converts a color object into a canvas-readable string', () => {
		const colorObject = to.Color({ r: 150, g: 100, b: 50, a: 0.5 })
		const expectedColorString = 'rgba(150,100,50,0.5)'
		expect(parseColor(colorObject)).toBe(expectedColorString)
	})
})
