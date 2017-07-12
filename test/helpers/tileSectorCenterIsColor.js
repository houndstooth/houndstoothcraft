import ctx from '../../src/render/ctx'
import testCtx from './testCtx'

const pixel = ([ x, y ]) => {
	const pixelData = ctx.getImageData(x, y, 1, 1).data
	return {
		r: pixelData[ 0 ],
		g: pixelData[ 1 ],
		b: pixelData[ 2 ],
		a: pixelData[ 3 ] / 255,
	}
}

const sectorCenter = ({ originInPixels, x, y, n, tileSizeInPixels }) => {
	const sectorSize = tileSizeInPixels / n
	return [
		originInPixels[ 0 ] + (x + 0.5) * sectorSize,
		originInPixels[ 1 ] + (y + 0.5) * sectorSize,
	]
}

const isCloseTo = (numberOne, numberTwo) => {
	const precision = 5

	let pow = Math.pow(10, precision + 1)
	let delta = Math.abs(numberOne - numberTwo)
	let maxDelta = Math.pow(10, -precision) / 2

	return Math.round(delta * pow) / pow <= maxDelta
}

const pixelIsColor = (colorOne, colorTwo) => {
	if (colorOne.a === 0 && colorOne.a === colorTwo.a) return true

	for (let i = 0; i < Object.keys(colorOne).length; i++) {
		const firstColorProperty = Object.entries(colorOne)[i]
		const firstColorPropertyValue = firstColorProperty[1]
		const firstColorPropertyKey = firstColorProperty[0]
		const secondColorPropertyValue = colorTwo[ firstColorPropertyKey ]
		if (!isCloseTo(firstColorPropertyValue, secondColorPropertyValue)) return false
	}

	return true
}

const drawPassMarker = (passed, coordinate, id) => {
	testCtx.strokeStyle = passed ? 'green' : 'red'
	testCtx.beginPath()

	testCtx.arc(coordinate[0], coordinate[1], 2, 0, 2 * Math.PI)

	testCtx.closePath()
	testCtx.stroke()

	if (!passed) {
		ctx.font = "8px Arial"
		ctx.fillStyle = 'red'
		ctx.fillText(id, coordinate[0] + 3, coordinate[1] + 3)
	}
}

export default ({ originInPixels, tileSizeInPixels, x, y, n, color, id }) => {
	const coordinateUnderTest = sectorCenter({ originInPixels, tileSizeInPixels, x, y, n })
	const actualColor = pixel(coordinateUnderTest)
	const passed = pixelIsColor(actualColor, color)
	drawPassMarker(passed, coordinateUnderTest, id)
	return passed
}
