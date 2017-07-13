import testContext from './testMarkersContext'
import { CANVAS_SIZE } from '../../src/defaults'
import settingsUtilities from '../../src/utilities/settingsUtilities'

export default () => {
	const canvasSize = settingsUtilities.getFromSettingsOrDefault({
		nestedPropertyPath: [ 'initial', 'viewSettings', 'canvasSize' ],
		defaultForProperty: CANVAS_SIZE,
	})
	testContext.clearRect(0, 0, canvasSize, canvasSize)
}
