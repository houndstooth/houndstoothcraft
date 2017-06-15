import shape from './shape'
import squareOrStripes from './squareOrStripes'

export default ({ address, tileColors }) => {
	squareOrStripes({ address, tileColors, shape })
}
