import tileSectorCenterIsColor from './tileSectorCenterIsColor'

export default ({ originInPixels, tileSizeInPixels, colors }) => {
	const expectations = [
		{ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: colors[0] },

		{ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: colors[1] },
		{ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: colors[1] },
		{ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: colors[1] },

		{ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: colors[0] },
		{ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: colors[0] },
		{ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: colors[0] },

		{ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: colors[1] },
	]

	return expectations.every(tileSectorCenterIsColor)
}
