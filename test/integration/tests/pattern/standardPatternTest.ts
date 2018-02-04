import { appState, executeEffect } from '../../../../src/indexForTest'
import { expectStandardPattern } from '../../helpers'

describe('standard houndstooth pattern', () => {
	// tslint:disable-next-line:max-line-length
	it('repeats a 2x2 pattern of a solid black, solid white, and two b&w diagonally striped tiles, the striped tiles having four stripes each, and their diagonal stripes being the minor diagonal', async (done: DoneFn) => {
		appState.settings.overrides = {
			basePattern: {
				gridSettings: { tileResolution: 4 },
			},
		}

		executeEffect.default()

		setTimeout(() => {
			expectStandardPattern()
			done()
		},         0)
	})
})
