import mathUtilities from '../../shared/utilities/mathUtilities'

export default ({ stripeCount, stripeIndex }) => {
	const { triangularRoot } = mathUtilities
	return triangularRoot(stripeIndex) / triangularRoot(stripeCount)
}
