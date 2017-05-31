const calculateColor = ({ colors, stripeIndex, substripeIndex }) => {
	stripeIndex = stripeIndex || 0
	substripeIndex = substripeIndex || 0
	const index = ( stripeIndex + substripeIndex ) % 2
	return colors[ index ]
}

export default {
	calculateColor
}