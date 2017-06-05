import mathUtilities from '../../shared/utilities/mathUtilities'

export default ({ stripeCount, stripeIndex }) => {
	const { triangularNumber, triangularRoot } = mathUtilities
	const previous = stripeCount - 1
	const tri = triangularNumber(previous)
	const current = triangularRoot(tri + stripeIndex)
	return current - previous
}
