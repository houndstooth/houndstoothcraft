import square from '../shapes/square'
import stripe from '../shapes/stripe'
import shape from './shape'

export default (args) => {
	args.coordinatesFunction = args.coordinatesOptions ? stripe : square
	shape(args)
}
