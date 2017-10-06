import isCloseTo from '../../helpers/isCloseTo'

export default (expected, actual) => actual.every((coordinate, x) => coordinate.every((dimension, y) => isCloseTo(dimension, expected[ x ][ y ])))
