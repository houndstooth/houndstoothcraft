import { from } from '../../../src'
import { Px } from '../../../src/page'
import { Pixel } from '../../../src/render'
import { isCloseTo } from '../../helpers/isCloseTo'

const pixelsAreClose: (expected: Pixel[], actual: Pixel[]) => boolean =
	(expected: Pixel[], actual: Pixel[]): boolean =>
		actual.every((pixel: Pixel, expectedPixelAddressX: number) =>
			pixel.every((px: Px, expectedPixelAddressY: number) =>
				isCloseTo(from.Px(px), from.Px(expected[ expectedPixelAddressX ][ expectedPixelAddressY ]))))

export { pixelsAreClose }
