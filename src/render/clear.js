import context from './context'
import { CANVAS_SIZE } from '../defaults'
import settingsUtilities from '../../src/utilities/settingsUtilities'

export default () => {
	const canvasSize = settingsUtilities.getFromSettingsOrDefault({
		nestedPropertyPath: [ 'initial', 'viewSettings', 'canvasSize' ],
		defaultForProperty: CANVAS_SIZE,
	})
	context.clearRect(0, 0, canvasSize, canvasSize)
}
