import { from } from '../../../src'
import { Pixel } from '../../../src/render'
import { isCloseTo } from '../../helpers/isCloseTo'

const pixelsAreClose: (expected: Pixel[], actual: Pixel[]) => boolean = (expected, actual) =>
	actual.every((pixel, x) =>
		pixel.every((dimension, y) =>
			isCloseTo(from.Dimension(dimension), from.Dimension(expected[ x ][ y ]))))

export { pixelsAreClose }
