import { drawPassMarker } from './drawPassMarker'
import { pixelIsColor } from './pixelIsColor'
import { PixelColorExpectation } from './types'

const pixelIsColorWithMarker: (_: PixelColorExpectation) => boolean = (params: PixelColorExpectation) => {
	const { coordinateUnderTest, expectedColor, id }: PixelColorExpectation = params
	const passed: boolean = pixelIsColor(coordinateUnderTest, expectedColor)
	drawPassMarker({ passed, coordinateUnderTest, id })

	return passed
}

export { pixelIsColorWithMarker }
