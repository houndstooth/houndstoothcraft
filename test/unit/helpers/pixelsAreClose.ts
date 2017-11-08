import { Px } from '../../../src/app/page'
import { Pixel } from '../../../src/app/render'
import * as from from '../../../src/from'
import { isCloseTo } from '../../helpers/isCloseTo'

const pixelsAreClose: (expected: Pixel[], actual: Pixel[]) => boolean =
	(expected: Pixel[], actual: Pixel[]): boolean =>
		actual.every((pixel: Pixel, expectedPixelAddressX: number) =>
			pixel.every((px: Px, expectedPixelAddressY: number) =>
				isCloseTo(from.Px(px), from.Px(expected[ expectedPixelAddressX ][ expectedPixelAddressY ]))))

export { pixelsAreClose }
