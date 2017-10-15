import Coordinate from './Coordinate'
import GetOutlineParams from './GetOutlineParams'

interface GetOutline {
	({}: GetOutlineParams): Coordinate[],
}

export default GetOutline
