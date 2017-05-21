import render from './render'
import maybeRotateCoordinates from '../utilities/maybeRotateCoordinates'
import calculateSquare from '../utilities/calculateSquare'

export default ({ sizedUnit, center, origin, rotationAboutCenter, color }) => {
    let coordinates = calculateSquare({ center, sizedUnit })
    coordinates = maybeRotateCoordinates({ coordinates, center, origin, rotationAboutCenter })
    render({ color, coordinates })
}