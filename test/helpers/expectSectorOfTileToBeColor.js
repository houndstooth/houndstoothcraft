import ctx from '../../src/render/ctx'

const pixel = ([ x, y ]) => {
	const pixelData = ctx.getImageData(x, y, 1, 1).data
	return {
		r: pixelData[ 0 ],
		g: pixelData[ 1 ],
		b: pixelData[ 2 ],
		a: pixelData[ 3 ] / 255,
	}
}

const sectorCenter = ({ address, x, y, n, tileSize }) => {
	const sectorSize = tileSize / n
	return [
		address[ 0 ] * tileSize + (x + 0.5) * sectorSize,
		address[ 1 ] * tileSize + (y + 0.5) * sectorSize,
	]
}

const expectToBeColor = (colorOne, colorTwo) => {
	if (colorOne.a === 0 && colorOne.a === colorTwo.a) return
	Object.entries(colorOne).forEach(([ key, value ]) => {
		expect(value).toBeCloseTo(colorTwo[ key ], 5)
	})
}

export default ({ address, tileSize, x, y, n, color }) => {
	expectToBeColor(
		pixel(
			sectorCenter({ address, tileSize, x, y, n })
		),
		color
	)
}
