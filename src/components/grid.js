import settingsUtilities from '../utilities/settingsUtilities'
import codeUtilities from '../utilities/codeUtilities'
import tile from './tile'
import { GRID_SIZE } from '../defaults'

export default () => {
	let { includeNegativeQuadrants } = current.settings.initial.gridSettings || {}
	const gridSize = settingsUtilities.getFromSettingsOrDefault({
		nestedPropertyPath: [ 'initial', 'gridSettings', 'gridSize' ],
		defaultForProperty: GRID_SIZE,
	})
	const { iterator } = codeUtilities

	if (includeNegativeQuadrants) {
		iterator(gridSize * 2).forEach(x => {
			iterator(gridSize * 2).forEach(y => {
				tile({ address: [ x - gridSize, y - gridSize ] })
			})
		})
	}
	else {
		iterator(gridSize).forEach(x => {
			iterator(gridSize).forEach(y => {
				tile({ address: [ x, y ] })
			})
		})
	}
}
