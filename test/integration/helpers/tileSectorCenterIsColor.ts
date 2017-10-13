import drawPassMarker from './drawPassMarker'
import pixelIsColor from './pixelIsColor'
import { Coordinate } from '../../../src/space'
import { Color } from '../../../src/render'

type TileSectorCenterIsColor = {
	({}: {
		originInPixels: Coordinate,
		tileSizeInPixels: number,
		x: number,
		y: number,
		n: number,
		color: Color,
		id?: number,
	}): boolean,
}

const tileSectorIsColor: TileSectorCenterIsColor = params => {
	const { originInPixels, tileSizeInPixels, x, y, n, color, id } = params
	const coordinateUnderTest = sectorCenter({ originInPixels, tileSizeInPixels, x, y, n })
	const passed = pixelIsColor(coordinateUnderTest, color)
	drawPassMarker({ passed, coordinateUnderTest, id })
	return passed
}

type SectorCenter = {
	({}: {
		originInPixels: Coordinate,
		x: number,
		y: number,
		n: number,
		tileSizeInPixels: number,
	}): Coordinate,
}

const sectorCenter: SectorCenter = ({ originInPixels, x, y, n, tileSizeInPixels }) => {
	const sectorSize = tileSizeInPixels / n
	return [
		originInPixels[ 0 ] + (x + 0.5) * sectorSize,
		originInPixels[ 1 ] + (y + 0.5) * sectorSize,
	]
}

export default tileSectorIsColor
