export default ({ address, stripeIndex, stripeCount }) => {
	const maybeDouble = stripeIndex >= stripeCount / 2 ? 2 : 1
	return Math.pow(
		2,
		Math.floor(
			(
				address.reduce(
					(a, b) => a + b,
					0
				) + 1
			) / 2
		) + 1
	) * maybeDouble
}
