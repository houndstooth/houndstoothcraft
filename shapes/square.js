export default ({ tileOrigin, sizedUnit }) => {
	const x = tileOrigin[ 0 ]
	const y = tileOrigin[ 1 ]

	return [
		[
			x,
			y
		],
		[
			x + sizedUnit,
			y
		],
		[
			x + sizedUnit,
			y + sizedUnit
		],
		[
			x,
			y + sizedUnit
		]
	]
}
