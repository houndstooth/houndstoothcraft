import testMarkersContext from './testMarkersContext'
import settingsPaths from '../../helpers/settingsPaths'
import getFromBasePatternOrDefault from '../../helpers/getFromBasePatternOrDefault'

export default () => {
	const canvasSize = getFromBasePatternOrDefault(settingsPaths.CANVAS_SIZE)
	testMarkersContext.clearRect(0, 0, canvasSize, canvasSize)
}
