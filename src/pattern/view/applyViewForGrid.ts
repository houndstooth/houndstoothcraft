import applyBackgroundColor from './applyBackgroundColor'
import applyOpacity from './applyOpacity'

const applyViewForGrid: () => void =
	(): void => {
		applyOpacity()
		applyBackgroundColor()
	}

export default applyViewForGrid
