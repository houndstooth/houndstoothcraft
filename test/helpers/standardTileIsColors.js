import tileSectorCenterIsColor from './tileSectorCenterIsColor'

export default ({ originInPixels, tileSizeInPixels, colors, baseId }) => {
	const expectations = [
		{ originInPixels, tileSizeInPixels, x: 0, y: 0, n: 4, color: colors[ 0 ], id: baseId + 0 },

		{ originInPixels, tileSizeInPixels, x: 2, y: 0, n: 4, color: colors[ 1 ], id: baseId + 1 },
		{ originInPixels, tileSizeInPixels, x: 1, y: 1, n: 4, color: colors[ 1 ], id: baseId + 2 },
		{ originInPixels, tileSizeInPixels, x: 0, y: 2, n: 4, color: colors[ 1 ], id: baseId + 3 },

		{ originInPixels, tileSizeInPixels, x: 3, y: 1, n: 4, color: colors[ 0 ], id: baseId + 4 },
		{ originInPixels, tileSizeInPixels, x: 2, y: 2, n: 4, color: colors[ 0 ], id: baseId + 5 },
		{ originInPixels, tileSizeInPixels, x: 1, y: 3, n: 4, color: colors[ 0 ], id: baseId + 6 },

		{ originInPixels, tileSizeInPixels, x: 3, y: 3, n: 4, color: colors[ 1 ], id: baseId + 7 },
	]

	return expectations.every(tileSectorCenterIsColor)
}
