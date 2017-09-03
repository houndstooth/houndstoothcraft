import codeUtilities from './codeUtilities'
import store from '../../store'

const parseColor = ({ r, g, b, a }) => `rgba(${  [ r, g, b, a ].join(',')  })`

const isTileUniform = ({ tileColorIndices }) => {
	for (let i = 0; i < tileColorIndices.length - 1; i++) {
		const colorOne = getColor({ index: tileColorIndices[ i ] })
		const colorTwo = getColor({ index: tileColorIndices[ i + 1 ] })
		if (!codeUtilities.shallowEqual(colorOne, colorTwo)) return false
	}
	return true
}

const getColor = ({ index }) => {
	const array = store.mainHoundstooth.basePattern.colorSettings.set
	return codeUtilities.wrappedIndex({ array, index })
}

export default {
	isTileUniform,
	parseColor,
	getColor,
}
