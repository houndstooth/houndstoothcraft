import { from } from '../../../src'
import { Pixel } from '../../../src/render'
import { isCloseTo } from '../../helpers/isCloseTo'

const pixelsAreClose: (expected: Pixel[], actual: Pixel[]) => boolean = (expected, actual) =>
	actual.every((pixel, x) =>
		pixel.every((px, y) =>
			isCloseTo(from.Px(px), from.Px(expected[ x ][ y ]))))

export { pixelsAreClose }
