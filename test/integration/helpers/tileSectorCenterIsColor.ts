import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'

const tileSectorIsColor = ({
	originInPixels,
	tileSizeInPixels,
	x,
	y,
	n,
	color,
	id,
}: {
	originInPixels,
	tileSizeInPixels,
	x,
	y,
	n,
	color,
	id?,
	}) => {
	const coordinateUnderTest = sectorCenter({ originInPixels, tileSizeInPixels, x, y, n })
	const passed = pixelIsColor(coordinateUnderTest, color)
	drawPassMarker({ passed, coordinateUnderTest, id })
	return passed
}

const sectorCenter = ({ originInPixels, x, y, n, tileSizeInPixels }) => {
	const sectorSize = tileSizeInPixels / n
	return [
		originInPixels[ 0 ] + (x + 0.5) * sectorSize,
		originInPixels[ 1 ] + (y + 0.5) * sectorSize,
	]
}

export default tileSectorIsColor
