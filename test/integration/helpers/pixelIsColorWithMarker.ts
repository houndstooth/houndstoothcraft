import { drawPassMarker } from './drawPassMarker'
import { pixelIsColor } from './pixelIsColor'
import { PixelColorExpectation } from './types'

const pixelIsColorWithMarker: (_: PixelColorExpectation) => boolean =
	({ coordinateUnderTest, expectedColor, id }: PixelColorExpectation): boolean => {
		const passed: boolean = pixelIsColor(coordinateUnderTest, expectedColor)
		drawPassMarker({ passed, coordinateUnderTest, id })

		return passed
	}

export { pixelIsColorWithMarker }
