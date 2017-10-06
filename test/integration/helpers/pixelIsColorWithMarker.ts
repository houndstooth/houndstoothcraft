import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'

const pixelIsColorWithMarker = ({ coordinateUnderTest, expectedColor, id }) => {
	const passed = pixelIsColor(coordinateUnderTest, expectedColor)
	drawPassMarker({ passed, coordinateUnderTest, id })
	return passed
}

export default pixelIsColorWithMarker
