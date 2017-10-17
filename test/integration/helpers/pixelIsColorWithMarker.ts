import { Color } from '../../../src/render'
import { Coordinate } from '../../../src/space'
import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'

const pixelIsColorWithMarker: (_: {
	coordinateUnderTest: Coordinate, expectedColor: Color, id: number,
}) => boolean = ({ coordinateUnderTest, expectedColor, id }) => {
	const passed = pixelIsColor(coordinateUnderTest, expectedColor)
	drawPassMarker({ passed, coordinateUnderTest, id })

	return passed
}

export default pixelIsColorWithMarker
