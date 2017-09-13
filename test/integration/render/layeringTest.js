import executeSelectedHoundstoothEffects from '../../../src/execute/executeSelectedHoundstoothEffects'
import activateTestMarkerCanvas from '../helpers/activateTestMarkerCanvas'
import { YELLOW, CYAN } from '../../../src/constants'
import pixelIsColorWithMarker from '../helpers/pixelIsColorWithMarker'
import state from '../../../state'
import resetState from '../../../src/store/resetState'

describe('layering', () => {
	beforeEach(() => resetState(state))

	it('blends colors from semi-translucent layers', () => {
		const houndstoothOverrides = {
			basePattern: {
				viewSettings: {	canvasSize: 100 },
				gridSettings: {	gridSize: 2	},
				colorSettings: { backgroundColor: YELLOW },
				layerSettings: { endLayer: 1 },
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: () => CYAN,
					opacity: () => 0.25,
				},
			},
		}
		activateTestMarkerCanvas()

		executeSelectedHoundstoothEffects({ houndstoothOverrides })

		const BLENDED_COLOR = { r: 192, g: 255, b: 63, a: 1 }
		const pixelInCellThatDemonstratesBlending = [ 75, 25 ]
		expect(pixelIsColorWithMarker(pixelInCellThatDemonstratesBlending, BLENDED_COLOR, 1)).toBe(true)
	})
})
