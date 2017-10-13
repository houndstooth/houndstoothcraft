import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'
import { Coordinate } from '../../../src/space'
import { Color } from '../../../src/render'

type PixelIsColorWithMarker = { ({}: { coordinateUnderTest: Coordinate, expectedColor: Color, id: number }): boolean }
const pixelIsColorWithMarker: PixelIsColorWithMarker = ({ coordinateUnderTest, expectedColor, id }) => {
	const passed = pixelIsColor(coordinateUnderTest, expectedColor)
	drawPassMarker({ passed, coordinateUnderTest, id })
	return passed
}

export default pixelIsColorWithMarker
