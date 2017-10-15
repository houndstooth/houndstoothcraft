import Coordinate from './Coordinate'
import GetStripeOutlineParams from './GetStripeOutlineParams'

interface GetStripeOutline {
	({}: GetStripeOutlineParams): Coordinate[],
}

export default GetStripeOutline
