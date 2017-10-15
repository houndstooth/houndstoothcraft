import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'
import { Coordinate } from '../../../src/space'
import { Color } from '../../../src/render'

const pixelIsColorWithMarker: {
	({}: { coordinateUnderTest: Coordinate, expectedColor: Color, id: number }): boolean,
} = ({ coordinateUnderTest, expectedColor, id }) => {
	const passed = pixelIsColor(coordinateUnderTest, expectedColor)
	drawPassMarker({ passed, coordinateUnderTest, id })

	return passed
}

export default pixelIsColorWithMarker
