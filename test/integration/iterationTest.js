import execute from '../../src/application/execute'
import composeMainHoundstooth from '../../src/store/composeMainHoundstooth'
import activateTestMarkerCanvas from './helpers/activateTestMarkerCanvas'
import { YELLOW, CYAN } from '../../src/constants'
import pixelIsColorWithMarker from './helpers/pixelIsColorWithMarker'
import store from '../../store'
import resetStore from '../../src/store/resetStore'

describe('layering', () => {
	beforeEach(() => resetStore(store))

	it('layers layer canvases on top of each other', () => {
		const layeringDemonstration = {
			basePattern: {
				viewSettings: {	canvasSize: 100 },
				gridSettings: {	gridSize: 2	},
				colorSettings: { backgroundColor: [ YELLOW ] },
				layerSettings: { endLayer: 1 },
			},
			layersPattern: {
				colorSettings: {
					backgroundColor: () => [ CYAN ],
					opacity: () => 0.25,
				},
			},
		}
		composeMainHoundstooth({ houndstoothEffects: [ layeringDemonstration ] })

		activateTestMarkerCanvas()

		execute()

		const BLENDED_COLOR = { r: 192, g: 255, b: 63, a: 1 }
		const pixelInCellThatDemonstratesBlending = [ 75, 25 ]
		expect(pixelIsColorWithMarker(pixelInCellThatDemonstratesBlending, BLENDED_COLOR, 1)).toBe(true)
	})
})
