export default ({ shapeOrigin, sizedUnit }) => {
	const x = shapeOrigin[ 0 ]
	const y = shapeOrigin[ 1 ]

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
