import { from, Pixel, Px } from '../../../src'
import { isCloseTo } from '../../helpers'

const pixelsAreClose: (expected: Pixel[], actual: Pixel[]) => boolean =
	(expected: Pixel[], actual: Pixel[]): boolean =>
		actual.every((pixel: Pixel, expectedPixelAddressX: number) =>
			pixel.every((px: Px, expectedPixelAddressY: number) =>
				isCloseTo(from.Px(px), from.Px(expected[ expectedPixelAddressX ][ expectedPixelAddressY ]))))

export default pixelsAreClose
