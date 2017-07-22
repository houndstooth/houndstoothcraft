import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'

export default (coordinateUnderTest, expectedColor, id) => {
	const passed = pixelIsColor(coordinateUnderTest, expectedColor)
	drawPassMarker(passed, coordinateUnderTest, id)
	return passed
}
